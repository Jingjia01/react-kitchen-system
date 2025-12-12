import React from "react";
import KitchenCard from "./KitchenCard";

export default function KitchenCardGrid({ orders, onStart, onComplete, onRevert }) {
  const MAX_ITEMS_PER_SECTION = 12;   
  const MAX_CARDS_PER_COLUMN = 2;    

  const allSections = [];
  orders.forEach(order => {
    for (let i = 0; i < order.items.length; i += MAX_ITEMS_PER_SECTION) {
      allSections.push({
        ...order,
        items: order.items.slice(i, i + MAX_ITEMS_PER_SECTION),
        continued: i + MAX_ITEMS_PER_SECTION < order.items.length,
      });
    }
  });

  const columns = [];
  let currentColumn = [];

  allSections.forEach(card => {
    if (currentColumn.length >= MAX_CARDS_PER_COLUMN) {
      columns.push(currentColumn);
      currentColumn = [];
    }
    currentColumn.push(card);
  });

  if (currentColumn.length > 0) columns.push(currentColumn);

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {columns.map((col, colIndex) => (
        <div key={colIndex} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {col.map((card, idx) => (
            <CardStatusControl
              key={idx}
              {...card}
              showButton={!card.continued}
              onStart={onStart}
              onComplete={onComplete}
              onRevert={onRevert}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function CardStatusControl({ items, type, orderId, time, table, continued, showButton, onStart, onComplete, onRevert }) {
  const handleStart = () => onStart && onStart(orderId);
  const handleDone = () => onComplete && onComplete(orderId);
  const handleRevert = () => onRevert && onRevert(orderId);

  return (
    <div style={{ minWidth: "250px" }}>
      <KitchenCard
        orderId={orderId}
        time={time}
        type={type}
        table={table}
        items={items}
        continued={continued}
        onStart={type === "Pending" ? handleStart : null}
        onDone={type === "Preparing" ? handleDone : null}
        onRevert={type === "Ready" ? handleRevert : null}
        showButton={showButton}
      />
    </div>
  );
}