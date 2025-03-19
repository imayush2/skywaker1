import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.js"; // Ensure this path is correct

const userModel = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // role: {
    //   type: DataTypes.STRING,
    //   allowNull: true, // Make role optional
    //   defaultValue: "user", // Default value is 'user'
    // },
  },
  {
    timestamps: false, // Disable automatic createdAt/updatedAt columns
  }
);

export default userModel;
