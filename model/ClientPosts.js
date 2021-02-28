const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comment = {
  clientId: { type: String, trim: true },
  message: { type: String, trim: true },
  createdOn: { type: Date, default: mongoose.now },
};

const ClientPosts = new Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    clientId: { type: String, required: true, trim: true },
    comment: [comment],
    status: { type: Boolean, enum: [false, true], default: false },
  },

  { timestamps: true }
);

const ClientPostRequest = mongoose.model("ClientPosts", ClientPosts);

module.exports = { ClientPostRequest };
