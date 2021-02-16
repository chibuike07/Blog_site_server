const GetOneClientPostByAdminRouter = require("express").Router();

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

const {
  getOnePost,
} = require("../../controller/AdminRequest/Posts/getSpecifiedPostText");

GetOneClientPostByAdminRouter.get(
  "/admin/get_single_post/:postId",
  // ClientVerifyAuth,
  getOnePost
);

module.exports = { GetOneClientPostByAdminRouter };
