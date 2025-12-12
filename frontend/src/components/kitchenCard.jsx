import React from "react";
import "./KitchenCard.css";
import { Printer } from "lucide-react";

const statusColors = {
  Pending: "#616160",    
  Preparing: "#e25e18",  
  Ready: "#00815b",      
};

const getButtonProps = (type, timer, onStart, onDone, onReset) => {
  switch (type) {
    case "Pending":
      return {
        label: "Start",
        onClick: onStart,
      };
    case "Preparing":
      return {
        label: "Complete",
        onClick: onDone,
      };
    case "Ready":
      return {
        label: "Revert",
        onClick: onReset, 
      };
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
    timer,
    isDone,
    onStart,
    onDone,
    showButton
}) {
    return (
        <div className="kcard">
            <div className="kcard-header" style={{ backgroundColor: statusColors[type] || "transparent" }}>
                <div className="kcard-header-left">
                    <span>Order #{orderId}</span>
                    <p>{time}</p>
                </div>

                <button className="kcard-printer-btn" onClick={() => console.log("print")}>
                    <Printer size={28} color="white" strokeWidth={1}/>
                </button>
            </div>

            <div className="kcard-row-2">
                <div className="kcard-table">{table}</div>
                {timer && <div className="kcard-timer">{timer}</div>}
            </div>

            <ul className="kcard-items">
                {items.map((item, i) => (
                    <li key={i} className="kcard-item">
                        <div className="kcard-item-line">
                            <span className="kcard-item-qty">{item.qty}</span>
                            <span className="kcard-item-name">{item.name}</span>
                        </div>

                        {item.note && (
                            <div className="kcard-item-note">
                                {item.note}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {continued && <div className="kcard-continued">Continued...</div>}

            <div className="button-row">
              {showButton && getButtonProps(type, timer, onStart, onDone, () => onStart && onStart()) && (
                <button
                  className="kcard-btn"
                  onClick={getButtonProps(type, timer, onStart, onDone, () => onStart && onStart()).onClick}
                  style={{
                    color: statusColors[type] || "#000",
                    border: `2px solid ${statusColors[type] || "#000"}`,
                    backgroundColor: "transparent",
                  }}
                >
                  {getButtonProps(type, timer, onStart, onDone, () => onStart && onStart()).label}
                </button>
              )}
            </div>
        </div>
    );
}