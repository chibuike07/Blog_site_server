const GetLastestLoggedInClientByAdminRouter = require("express").Router();

const {
  getLatestLogedInData,
} = require("../../controller/AdminRequest/Posts/adminDashboardDatas");

const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");

GetLastestLoggedInClientByAdminRouter.get(
  "/admin/dashboard_data",
  AdminVerifyAuth,
  getLatestLogedInData
);

module.exports = { GetLastestLoggedInClientByAdminRouter };
