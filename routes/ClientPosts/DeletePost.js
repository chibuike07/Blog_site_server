const ClientDeletePostRouter = require("express").Router();

const {
  deletePostByClient,
} = require("../../controller/ClientPostRequest/DeletePost");
const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

ClientDeletePostRouter.delete(
  "/post/:postId",
  ClientVerifyAuth,
  deletePostByClient
);

module.exports = { ClientDeletePostRouter };
