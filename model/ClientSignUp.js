const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contact = {
  state: {
    type: String,
    default: "",
    trim: true,
  },
  city: {
    type: String,
    default: "",
    trim: true,
  },

  address: {
    type: String,
    default: "",
    trim: true,
  },
  account_type: {
    type: String,
    trim: true,
    enum: ["Client"],
    default: "Client",
  },
};

const ClientData = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    profileImage: { type: String, trim: true, default: "" },
    password: { type: String, trim: true },
    phone: { type: String },
    contact: contact,
    posts: { type: Number, default: 0 },
    registeredIpAddress: { type: String },
    loggedIn: { type: Boolean, default: false },
    loginTime: { type: String, default: "" },
    ClientLoggedInIpAddress: { type: String, default: "" },
    active: { type: Boolean, default: true },
    resetToken: { type: String },
    account_type: {
      type: String,
      trim: true,
      enum: ["CLIENT"],
      default: "CLIENT",
    },
    expireToken: Date,
  },

  { timestamps: true }
);

const ClientSignUp = mongoose.model("ClientData", ClientData);

module.exports = { ClientSignUp };
