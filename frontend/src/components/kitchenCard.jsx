import React from "react";
import "./KitchenCard.css";
import { Printer } from "lucide-react";

const statusColors = {
  Pending: "#616160",    
  Preparing: "#e25e18",  
  Ready: "#00815b",      
};

const getButtonProps = (type, onStart, onDone, onRevert) => {
  switch (type) {
    case "Pending":
      return { label: "Start", onClick: onStart };
    case "Preparing":
      return { label: "Complete", onClick: onDone };
    case "Ready":
      return { label: "Revert", onClick: onRevert };
    default:
      return null;
  }
};

export default function KitchenCard({
  orderId,
  time, 
  type,
  table,
  items,
  continued,
  onStart,
  onDone,
  onRevert,
  showButton
}) {
  const buttonProps = getButtonProps(type, onStart, onDone, onRevert);

  return (
    <div className="kcard">
      <div className="kcard-header" style={{ backgroundColor: statusColors[type] || "transparent" }}>
        <div className="kcard-header-left">
          <span>Order #{orderId}</span>
          <p>{time}</p>
        </div>

        <button 
          className="kcard-printer-btn"
          onClick={() => {
            if (window.electronAPI) {
              window.electronAPI.printOrder({
                orderId,
                time,
                table,
                items
              });
            } else {
              console.warn("Electron API not available");
            }
          }}
        
        >
          <Printer size={28} color="white" strokeWidth={1}/>
        </button>
      </div>

      <div className="kcard-row-2">
        <div className="kcard-table">{table}</div>
      </div>

      <ul className="kcard-items">
        {items.map((item, i) => (
          <li key={i} className="kcard-item">
            <div className="kcard-item-line">
              <span className="kcard-item-qty">{item.qty}</span>
              <span className="kcard-item-name">{item.name}</span>
            </div>
            {item.note && <div className="kcard-item-note">{item.note}</div>}
          </li>
        ))}
      </ul>

      {continued && <div className="kcard-continued">Continued...</div>}

      <div className="button-row">
        {showButton && buttonProps && (
          <button
            className="kcard-btn"
            onClick={buttonProps.onClick}
            style={{
              color: statusColors[type] || "#000",
              border: `2px solid ${statusColors[type] || "#000"}`,
              backgroundColor: "transparent",
            }}
          >
            {buttonProps.label}
          </button>
        )}
      </div>
    </div>
  );
}
