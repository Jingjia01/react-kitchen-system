//@ts-ignore
import KitchenCardGrid from "../components/KitchenCardGrid";
import './page.css'

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
        { qty: 1, name: "Vegan Burger" },
        { qty: 1, name: "Sweet Potato Fries", note: "No salt" },
        { qty: 1, name: "Sweet Potato Fries", note: "No salt" },
        { qty: 1, name: "Crispy Pork Belly" },
        { qty: 1, name: "Vegan Burger" },
        { qty: 1, name: "Sweet Potato Fries", note: "No salt" },
        { qty: 1, name: "Sweet Potato Fries", note: "No salt" },
      ],
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
    },
    {
      orderId: 103,
      time: "12:20 PM",
      type: "Ready",
      table: "Takeout",
      items: [
        { qty: 1, name: "Vegan Burger" },
        { qty: 1, name: "Sweet Potato Fries", note: "No salt" },
        { qty: 1, name: "Vegan Burger" },
        { qty: 1, name: "Sweet Potato Fries", note: "No salt" },
        { qty: 1, name: "Sweet Potato Fries", note: "No salt" },
        { qty: 1, name: "Vegan Burger" },
      ],
    },
    {
      orderId: 104,
      time: "12:23 PM",
      type: "Ready",
      table: "Takeout",
      items: [
        { qty: 1, name: "Vegan Burger" },
      ],
    },
  ];

  return (
    <main className="h-[90%] px-4">
      <div className="orders-container">
        <KitchenCardGrid orders={orders} />
      </div>
    </main>
  );
}