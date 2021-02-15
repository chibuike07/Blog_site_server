const GetOneClientByAdminRouter = require("express").Router();

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");
const {
  getOneClient,
} = require("../../controller/AdminRequest/GetSpecifiedUser");

GetOneClientByAdminRouter.get(
  "/admin/get_one_client/:userId",
  // ClientVerifyAuth,
  getOneClient
);

module.exports = { GetOneClientByAdminRouter };
