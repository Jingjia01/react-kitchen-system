import socketio

sio = socketio.Client()

@sio.event
def connect():
    print("Connected to server")

@sio.on("INITIAL_ORDERS")
def on_initial(data):
    print("Initial orders:", data)

@sio.on("NEW_ORDER")
def on_new_order(data):
    print("New order:", data)

@sio.on("UPDATE_ORDER")
def on_update_order(data):
    print("Updated order:", data)

sio.connect("http://localhost:5000")
sio.wait()
