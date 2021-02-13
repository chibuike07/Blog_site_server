const GetLastestLoggedInClientByAdminRouter = require("express").Router();

const {
  SuperVerifiedAuth,
} = require("../../middleware/Authentication/SuperVerifiedAuth");

const {
  getLatestLogedInData,
} = require("../../controller/AdminRequest/Posts/adminDashboardDatas");

GetLastestLoggedInClientByAdminRouter.get(
  "/admin/dashboard_data",
  // SuperVerifiedAuth,
  getLatestLogedInData
);

module.exports = { GetLastestLoggedInClientByAdminRouter };
