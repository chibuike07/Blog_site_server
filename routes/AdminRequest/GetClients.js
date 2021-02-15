const GetAllClientByAdminRouter = require("express").Router();
const { getAllClients } = require("../../controller/AdminRequest/GetClients");
const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

GetAllClientByAdminRouter.get(
  "/admin/get_client",
  // ClientVerifyAuth,
  getAllClients
);

module.exports = { GetAllClientByAdminRouter };
