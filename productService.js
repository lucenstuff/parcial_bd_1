const database = require("./database");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    availableOn: { type: Date },
    deletedAt: { type: Date, default: null },
  }, { collection: 'products' });
  

const Product = mongoose.model("Product", productSchema);

async function getAllProducts() {
  try {
    console.log("Attempting to fetch products from DB...");
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error("Error fetching products in productService:", error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
};
