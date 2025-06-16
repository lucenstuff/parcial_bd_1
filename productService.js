const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    availableOn: { type: Date },
    deletedAt: { type: Date, default: null },
  },
  { collection: "products" }
);

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

async function getProductById(productId) {
  try {
    console.log(`Attempting to fetch product with ID: ${productId}`);
    const product = await Product.findById(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found`);
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
}

async function createProduct(productData) {
  try {
    console.log("Attempting to create a new product...");
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    console.error("Error creating product in productService:", error);
    throw error;
  }
}

async function updateProduct(productId, productData) {
  try {
    console.log(`Attempting to update product with ID: ${productId}`);
    const product = await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    });
    if (!product) {
      console.error(`Product with ID ${productId} not found`);
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    console.log(`Attempting to delete product with ID: ${productId}`);
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found`);
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
};
