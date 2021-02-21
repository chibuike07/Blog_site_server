const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

const {
  getOnePost,
} = require("../../controller/ClientPostRequest/getSpecifiedPostText");

const ClientGetSpecifiedPostRouter = require("express").Router();

ClientGetSpecifiedPostRouter.get(
  "/one_post/:postId",
  ClientVerifyAuth,
  getOnePost
);

module.exports = { ClientGetSpecifiedPostRouter };
