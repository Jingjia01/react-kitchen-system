//@ts-ignore
import React from "react";
import { useSocket } from "../SocketContext";
import { updateOrder } from "../api";
import KitchenCardGrid from "../components/KitchenCardGrid"; 

export default function CompletedPage() {
  const { orders } = useSocket();
  const completedOrders = orders.filter(o => o.type === "Ready");

  const handleRevert = (orderId) => updateOrder(orderId, { type: "Preparing" });

  return (
    <div className="h-[90%] px-4" style={{marginTop: "80px"}}>
      <KitchenCardGrid
        orders={completedOrders}
        onRevert={handleRevert}
      />
    </div>
  );
}