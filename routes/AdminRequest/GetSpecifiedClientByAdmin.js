const GetOneClientByAdminRouter = require("express").Router();
const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");

const {
  getOneClient,
} = require("../../controller/AdminRequest/GetSpecifiedUser");

GetOneClientByAdminRouter.get(
  "/admin/get_one_client/:userId",
  AdminVerifyAuth,
  getOneClient
);

module.exports = { GetOneClientByAdminRouter };
