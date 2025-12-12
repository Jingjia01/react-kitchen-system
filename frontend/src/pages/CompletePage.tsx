//@ts-ignore
import KitchenCard from "../components/kitchenCard"

export default function OpenPage() {
  const orders = [
    {
      orderId: 101,
      time: "12:15 PM",
      type: "Ready",
      table: "Table 3",
      items: [
        { qty: 2, name: "Fried Buffalo Shrimp Taco", note: "Extra spicy" },
        { qty: 1, name: "Crispy Pork Belly" },
        { qty: 2, name: "Fried Buffalo Shrimp Taco", note: "Extra spicy" },
        { qty: 1, name: "Crispy Pork Belly" },
        { qty: 2, name: "Fried Buffalo Shrimp Taco", note: "Extra spicy" },
        { qty: 1, name: "Crispy Pork Belly" },
        { qty: 2, name: "Fried Buffalo Shrimp Taco", note: "Extra spicy" },
        { qty: 1, name: "Crispy Pork Belly" },
      ],
      continued: false,
      timer: "00:15",
      isDone: false,
      onStart: () => console.log("Order 101 started"),
      onDone: () => console.log("Order 101 done"),
    },
    {
      orderId: 102,
      time: "12:20 PM",
      type: "Ready",
      table: "Takeout",
      items: [
        { qty: 1, name: "Vegan Burger" },
        { qty: 1, name: "Sweet Potato Fries", note: "No salt" },
      ],
      continued: true,
      timer: null,
      isDone: false,
      onStart: () => console.log("Order 102 started"),
      onDone: () => console.log("Order 102 done"),
    },
  ];

  return (
    <main className="p-4">
      <div className="open-orders-grid mt-4">
        {orders.map((order) => (
          <KitchenCard key={order.orderId} {...order} />
        ))}
      </div>
    </main>
  );
}