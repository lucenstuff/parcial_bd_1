const database = require("./database");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
});

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String },
  addresses: [
    {
      type: { type: String, enum: ["shipping", "billing"], required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
  ],
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});

async function createUser(userData) {
  try {
    const User = database.model("User", userSchema);
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function getUserById(userId) {
  try {
    const User = database.model("User", userSchema);
    return await User.findById(userId);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}
async function updateUser(userId, userData) {
  try {
    const User = database.model("User", userSchema);
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
async function deleteUser(userId) {
  try {
    const User = database.model("User", userSchema);
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
async function createUserProfile(profileData) {
  try {
    const UserProfile = database.model("UserProfile", userProfileSchema);
    const profile = new UserProfile(profileData);
    return await profile.save();
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}
async function getUserProfileByUserId(userId) {
  try {
    const UserProfile = database.model("UserProfile", userProfileSchema);
    return await UserProfile.findOne({ userId }).populate("userId");
  } catch (error) {
    console.error("Error fetching user profile by user ID:", error);
    throw error;
  }
}
async function updateUserProfile(userId, profileData) {
  try {
    const UserProfile = database.model("UserProfile", userProfileSchema);
    return await UserProfile.findOneAndUpdate({ userId }, profileData, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
async function deleteUserProfile(userId) {
  try {
    const UserProfile = database.model("UserProfile", userProfileSchema);
    return await UserProfile.findOneAndDelete({ userId });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw error;
  }
}
module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  createUserProfile,
  getUserProfileByUserId,
  updateUserProfile,
  deleteUserProfile,
};
