import axios from "axios";

const API_BASE = "http://127.0.0.1:5000";

export const updateOrder = async (orderId, data) => {
  try {
    const response = await axios.post(`${API_BASE}/orders/${orderId}/update`, data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};