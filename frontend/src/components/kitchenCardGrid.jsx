import React, { useState, useEffect } from "react";
import KitchenCard from "./KitchenCard";

export default function KitchenCardGrid({ orders }) {
  const MAX_ITEMS_PER_SECTION = 12; 
  const STACK_THRESHOLD = 8;       

  const allSections = orders.flatMap((order) => {
    const sections = [];
    for (let i = 0; i < order.items.length; i += MAX_ITEMS_PER_SECTION) {
      sections.push({
        ...order,
        items: order.items.slice(i, i + MAX_ITEMS_PER_SECTION),
        continued: i + MAX_ITEMS_PER_SECTION < order.items.length,
        isLastSection: i + MAX_ITEMS_PER_SECTION >= order.items.length,
      });
    }
    return sections;
  });

  const columns = [];
  let currentColumn = [];
  for (let i = 0; i < allSections.length; i++) {
    const currentCard = allSections[i];
    const nextCard = allSections[i + 1];

    currentColumn.push(currentCard);

    const nextItemCount = nextCard?.items.length || 0;
    const currentItemCount = currentCard.items.length;

    if (currentItemCount + nextItemCount >= STACK_THRESHOLD) {
      columns.push(currentColumn);
      currentColumn = [];
    }
  }

  // push any remaining cars
  if (currentColumn.length > 0) columns.push(currentColumn);

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {columns.map((col, colIndex) => (
        <div key={colIndex} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {col.map((card, idx) => (
            <CardWithTimer key={idx} {...card} />
          ))}
        </div>
      ))}
    </div>
  );
};

function CardWithTimer({ items, type, orderId, time, table, continued, isLastSection }) {
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleStart = () => { if (!startTime) setStartTime(Date.now()); };
  const handleDone = () => { setIsDone(true); };

  useEffect(() => {
    if (!startTime || isDone) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isDone]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ minWidth: "250px" }}>
      <KitchenCard
        orderId={orderId}
        time={time}
        type={type}
        table={table}
        items={items}
        continued={continued}
        timer={startTime && !isDone ? formatTime(elapsed) : null}
        isDone={isDone}
        onStart={handleStart}
        onDone={handleDone}
        showButton={isLastSection}
      />
    </div>
  );
}
