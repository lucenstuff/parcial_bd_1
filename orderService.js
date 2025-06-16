const db = require("./database");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [
    {
      variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    type: { type: String, default: "shipping" },
    street: String,
    city: String,
    zip: String,
    country: String,
  },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
});

async function createOrder(orderData) {
  try {
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    return await Order.findById(orderId)
      .populate("items.variantId")
      .populate("items.productId");
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
}

async function getAllOrders() {
  try {
    return await Order.find()
      .populate("items.variantId")
      .populate("items.productId");
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
}

async function updateOrder(orderId, orderData) {
  try {
    return await Order.findByIdAndUpdate(orderId, orderData, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}
async function deleteOrder(orderId) {
  try {
    return await Order.findByIdAndDelete(orderId);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}
const Order = mongoose.model("Order", orderSchema);
module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
