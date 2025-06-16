require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    if (!uri) {
      throw new Error("MONGODB_URI no está definida en el archivo .env");
    }
    await mongoose.connect(uri);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw error;
  }
}

async function closeDatabaseConnection() {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing the database connection:", error.message);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};
