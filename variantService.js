const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    attributes: {
      color: { type: String, required: true },
      size: { type: String, required: true },
    },
    isMaster: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "variants" }
);

const Variant = mongoose.model("Variant", variantSchema);

async function createVariant(variantData) {
  try {
    const variant = new Variant(variantData);
    return await variant.save();
  } catch (error) {
    console.error("Error creating variant:", error);
    throw error;
  }
}

async function getVariantById(variantId) {
  try {
    return await Variant.findById(variantId).populate("productId");
  } catch (error) {
    console.error("Error fetching variant by ID:", error);
    throw error;
  }
}

async function getVariantsByProductId(productId) {
  try {
    return await Variant.find({ productId }).populate("productId");
  } catch (error) {
    console.error("Error fetching variants by product ID:", error);
    throw error;
  }
}

async function updateVariant(variantId, variantData) {
  try {
    return await Variant.findByIdAndUpdate(variantId, variantData, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating variant:", error);
    throw error;
  }
}

async function deleteVariant(variantId) {
  try {
    return await Variant.findByIdAndDelete(variantId);
  } catch (error) {
    console.error("Error deleting variant:", error);
    throw error;
  }
}

module.exports = {
  createVariant,
  getVariantById,
  getVariantsByProductId,
  updateVariant,
  deleteVariant,
  Variant,
};
