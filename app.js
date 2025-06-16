const { connectToDatabase, closeDatabaseConnection } = require("./database");
const { getAllProducts } = require("./productService");

async function main() {
  try {
    await connectToDatabase();

    const products = await getAllProducts();
    console.log("Products:", products);
  } catch (error) {
    console.error("Error in main application:", error);
  } finally {
    await closeDatabaseConnection();
  }
}

main();
