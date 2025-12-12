import eventlet
eventlet.monkey_patch()

from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
import time
import random
import copy

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

orders = []
next_order_id = 101

@app.route("/orders/<int:order_id>/update", methods=["POST"])
def update_order(order_id):
    data = request.json
    order_type = data.get("type")
    time_taken = data.get("timeTaken")

    for order in orders:
        if order['orderId'] == order_id:
            order['type'] = order_type
            if time_taken is not None:
                order['timeTaken'] = time_taken
            socketio.emit("UPDATE_ORDER", order)
            return jsonify(order)

    return jsonify({"error": "Order not found"}), 404


def order_generator():
    global next_order_id

    base_menu_items = [
        {"qty": 1, "name": "Vegan Burger"},
        {"qty": 1, "name": "Sweet Potato Fries", "note": "No salt"},
        {"qty": 1, "name": "Fried Buffalo Shrimp Taco"},
        {"qty": 1, "name": "Crispy Pork Belly"},
        {"qty": 1, "name": "Grilled Chicken Sandwich"},
        {"qty": 1, "name": "Caesar Salad"},
        {"qty": 1, "name": "Margherita Pizza"},
        {"qty": 1, "name": "Spaghetti Bolognese"},
        {"qty": 1, "name": "Chocolate Lava Cake"},
        {"qty": 1, "name": "Iced Lemon Tea"},
    ]

    tables = ["Table 1", "Table 2", "Takeout", "Delivery"]

    while True:
        socketio.sleep(random.randint(5, 15))

        chosen_items = [copy.deepcopy(item) for item in random.choices(base_menu_items, k=random.randint(1, 6))]

        new_order = {
            "orderId": next_order_id,
            "time": time.strftime("%I:%M %p"),
            "type": "Pending",
            "table": random.choice(tables),
            "items": chosen_items,
        }

        orders.append(new_order)
        next_order_id += 1

        print(f"New order generated: {new_order}")
        socketio.emit("NEW_ORDER", new_order)


@socketio.on("connect")
def handle_connect():
    emit("INITIAL_ORDERS", orders)
    print("Client connected")


if __name__ == "__main__":
    socketio.start_background_task(order_generator)
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
