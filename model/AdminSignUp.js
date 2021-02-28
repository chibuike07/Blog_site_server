const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminData = new Schema(
  {
    email: { type: String, required: true, trim: true },
    password: { type: String, trim: true, required: true },
    account_type: {
      type: String,
      trim: true,
      enum: ["ADMIN"],
      default: "ADMIN",
    },
  },

  { timestamps: true }
);

const AdminSignUp = mongoose.model("adminData", AdminData);

module.exports = { AdminSignUp };
