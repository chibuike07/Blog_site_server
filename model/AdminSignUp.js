const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminData = new Schema(
  {
    email: { type: String, required: true, trim: true },
    password: { type: String, trim: true, required: true },
  },

  { timestamps: true }
);

const AdminSignUp = mongoose.model("adminData", AdminData);

module.exports = { AdminSignUp };
