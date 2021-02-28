const GetClientPostByAdminRouter = require("express").Router();

const {
  getLatestLogedInData,
} = require("../../controller/AdminRequest/Posts/adminDashboardDatas");

const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");
const {
  getPostByAdmin,
} = require("../../controller/AdminRequest/Posts/getPostTest");

GetClientPostByAdminRouter.get(
  "/admin/getPost",
  AdminVerifyAuth,
  getPostByAdmin
);

module.exports = {
  GetClientPostByAdminRouter,
};
