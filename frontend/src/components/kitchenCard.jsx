import React from "react";
import "./KitchenCard.css";
import { Printer } from "lucide-react";

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
}) {
    return (
        <div className="kcard">
            <div className={`kcard-header ${type}`}>
                <div className="kcard-header-left">
                    <span>Order #{orderId}</span>
                    <span>{time}</span>
                </div>

                <button className="kcard-printer-btn" onClick={() => console.log("print")}>
                    <Printer size={20} />
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

            {!isDone ? (
                <button
                    className={`kcard-btn ${timer ? "btn-done" : ""}`}
                    onClick={timer ? onDone : onStart}
                >
                    {timer ? "Mark Done" : "Start"}
                </button>
            ) : (
                <div className="kcard-finished">Completed</div>
            )}
        </div>
    );
}