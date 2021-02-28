const GetOneClientPostByAdminRouter = require("express").Router();

const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");

const {
  getOnePost,
} = require("../../controller/AdminRequest/Posts/getSpecifiedPostText");

GetOneClientPostByAdminRouter.get(
  "/admin/get_single_post/:postId",
  AdminVerifyAuth,
  getOnePost
);

module.exports = { GetOneClientPostByAdminRouter };
