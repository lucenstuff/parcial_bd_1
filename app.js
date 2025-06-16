const { connectToDatabase, closeDatabaseConnection } = require("./database");
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("./productService");
const {
  createVariant,
  getVariantById,
  updateVariant,
  deleteVariant,
} = require("./variantService");

async function main() {
  try {
    await connectToDatabase();

    // CREATE
    console.log("CREATE OPERATIONS");
    const newProduct = await createProduct({
      name: "Camisa Básica",
      description: "Camisa 100% algodón",
      availableOn: Date.now(),
      deletedAt: null,
    });

    const newVariant = await createVariant({
      productId: newProduct._id,
      sku: "CAM-001-AZBLXL",
      price: 4999.99,
      stock: 25,
      attributes: {
        color: "Blanco",
        size: "XL",
      },
      isMaster: true,
    });

    // READ
    console.log("READ OPERATIONS");
    const fetchedProduct = await getProductById(newProduct._id);
    console.log("Product:", fetchedProduct);

    const fetchedVariant = await getVariantById(newVariant._id);
    console.log("Variant:", fetchedVariant);

    // UPDATE
    console.log("UPDATE OPERATIONS");
    const updatedProduct = await updateProduct(newProduct._id, {
      name: "Camisa Actualizada",
      description: "Camisa 100% algodón, ahora con más colores",
    });
    console.log("Updated Product:", updatedProduct);

    const updatedVariant = await updateVariant(newVariant._id, {
      price: 5299.99,
      stock: 20,
    });
    console.log("Updated Variant:", updatedVariant);
    console.log("Updated Variant");

    // DELETE
    console.log("DELETE OPERATIONS");
    await deleteVariant(newVariant._id);
    await deleteProduct(newProduct._id);

    console.log("Deleted Variant and Product");
    console.log(await getAllProducts());
  } catch (error) {
    console.error("Error in main:", error);
  } finally {
    await closeDatabaseConnection();
  }
}

main();
