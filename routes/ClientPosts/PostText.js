const { addPost } = require("../../controller/ClientPostRequest/postText");
const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

const ClientPostRouter = require("express").Router();

ClientPostRouter.post("/post", ClientVerifyAuth, addPost);

module.exports = { ClientPostRouter };
