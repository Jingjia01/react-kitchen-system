const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 1400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:5173"); 
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("print-order", async (event, orderData) => {
  const printWindow = new BrowserWindow({
    show: false,
    webPreferences: { sandbox: false }
  });

  printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(generateReceiptHTML(orderData))}`);

  printWindow.webContents.on("did-finish-load", async () => {
    try {
      const pdfData = await printWindow.webContents.printToPDF({
        printBackground: true,
        margins: { marginType: "none" },
        pageSize: { width: 58000,  height: 200000 } 
      });

      const outputDir = path.join(__dirname, "saved_orders");
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

      const fileName = `order_${orderData.orderId}.pdf`;
      const filePath = path.join(outputDir, fileName);

      fs.writeFileSync(filePath, pdfData);
      console.log(`PDF saved: ${filePath}`);

      printWindow.close();
    } catch (err) {
      console.error("Failed to save PDF:", err);
      printWindow.close();
    }
  });
});

function generateReceiptHTML(order) {
  const itemsHtml = order.items.map(i => `
    <div style="display:flex; justify-content: space-between;">
      <span>${i.qty} x ${i.name}</span>
      ${i.note ? `<span>${i.note}</span>` : ""}
    </div>
  `).join("");

  return `
    <html>
      <head>
        <style>
          body { font-family: monospace; font-size: 12px; width: 200px; }
          hr { border: 1px dashed #000; }
          .header { text-align: center; margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <strong>Order #${order.orderId}</strong><br/>
          ${order.time}<br/>
          ${order.table}
        </div>
        <hr/>
        ${itemsHtml}
        <hr/>
        <div style="text-align:center;">Thank you!</div>
      </body>
    </html>
  `;
}