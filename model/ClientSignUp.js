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
};

const ClientData = new Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, required: true, trim: true },
    profileImage: { type: String, trim: true, default: "" },
    password: { type: String, trim: true, required: true },
    phone: { type: Number },
    contact: contact,
    posts: { type: Number, default: 0 },
    registeredIpAddress: { type: String, required: true },
  },

  { timestamps: true }
);

const ClientStatus = new Schema(
  {
    loginedIn: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ClientData.add(ClientStatus);

const ClientSignUp = mongoose.model("ClientData", ClientData);

module.exports = { ClientSignUp };
