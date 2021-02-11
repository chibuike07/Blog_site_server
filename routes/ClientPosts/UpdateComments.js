const ClientUpdateSpecifiedPostCommentRouter = require("express").Router();
const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

const {
  updateComment,
} = require("../../controller/ClientPostRequest/upDateComment");

ClientUpdateSpecifiedPostCommentRouter.put(
  "/comment/:post_id",
  ClientVerifyAuth,
  updateComment
);

module.exports = {
  ClientUpdateSpecifiedPostCommentRouter,
};
