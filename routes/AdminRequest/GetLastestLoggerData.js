const GetLastestLoggedInClientByAdminRouter = require("express").Router();

const {
  getLatestLogedInData,
} = require("../../controller/AdminRequest/Posts/adminDashboardDatas");

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

GetLastestLoggedInClientByAdminRouter.get(
  "/admin/dashboard_data",
  // ClientVerifyAuth,
  getLatestLogedInData
);

module.exports = { GetLastestLoggedInClientByAdminRouter };
