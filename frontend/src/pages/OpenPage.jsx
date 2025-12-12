//@ts-ignore
import React from "react";
import { useSocket } from "../SocketContext";
import { updateOrder } from "../api";
import KitchenCardGrid from "../components/KitchenCardGrid";

export default function OpenOrders() {
  const { orders } = useSocket();
  const openOrders = orders.filter(o => o.type !== "Ready");

  const handleStart = (orderId) => updateOrder(orderId, { type: "Preparing" });
  const handleComplete = (orderId) => updateOrder(orderId, { type: "Ready" });

  return (
    <div className="h-[90%] px-4" style={{marginTop: "80px"}}>
      <KitchenCardGrid
        orders={openOrders}
        onStart={handleStart}
        onComplete={handleComplete}
      />
    </div>
  );
}