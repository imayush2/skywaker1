import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import { config } from "dotenv";
config({ path: "../.env" });

// new user register controller
export const register = async (req, res) => {
  const { name, email, password } = req.body; // Removed 'role'

  // Ensure all required fields are provided
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const trimmedEmail = email.trim(); // Trim spaces around email
    console.log("Checking for existing user with email:", trimmedEmail);

    // Check if user already exists using case-insensitive comparison for MySQL
    const existingUser = await userModel.findOne({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("email")),
        Sequelize.fn("LOWER", trimmedEmail)
      ),
    });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user, no 'role' field required
    const user = await userModel.create({
      name,
      email: trimmedEmail,
      password: hashedPassword,
      // No role field is included now
    });

    // Create JWT token without 'role' field
    const token = jwt.sign(
      { id: user.id }, // Removed 'role' from the JWT payload
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Ensure email is trimmed and lowercase
    const trimmedEmail = email.trim().toLowerCase();

    // Find the user in the database with case-insensitive email comparison
    const user = await userModel.findOne({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("email")),
        Sequelize.fn("LOWER", trimmedEmail)
      ),
    });

    // Check if user exists
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Create JWT token without 'role' field
    const token = jwt.sign(
      { id: user.id }, // Removed 'role' from the JWT payload
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error in login:", error);
    return res.json({ success: false, message: error.message });
  }
};

// logout controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Adjust for production
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
