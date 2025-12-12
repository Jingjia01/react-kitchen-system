import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); 
    setSocket(newSocket);

    newSocket.on("connect", () => console.log("Connected to SocketIO"));

    newSocket.on("INITIAL_ORDERS", (data) => setOrders(data));
    newSocket.on("NEW_ORDER", (order) => setOrders((prev) => [...prev, order]));
    newSocket.on("UPDATE_ORDER", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o.orderId === updatedOrder.orderId ? updatedOrder : o))
      );
    });

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, orders }}>
      {children}
    </SocketContext.Provider>
  );
};