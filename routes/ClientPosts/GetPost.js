const ClientGetPostRouter = require("express").Router();
const { getPost } = require("../../controller/ClientPostRequest/getPostTest");
const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

ClientGetPostRouter.get("/post", ClientVerifyAuth, getPost);

module.exports = { ClientGetPostRouter };
