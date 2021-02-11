const ClientGetPostBySpecifiedUserRouter = require("express").Router();

const {
  getPostBySpecifiedUser,
} = require("../../controller/ClientPostRequest/GetPostBySpecifiedUser");
const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

ClientGetPostBySpecifiedUserRouter.get(
  "/mypost",
  ClientVerifyAuth,
  getPostBySpecifiedUser
);

module.exports = { ClientGetPostBySpecifiedUserRouter };
