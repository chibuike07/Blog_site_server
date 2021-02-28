const GetAllClientByAdminRouter = require("express").Router();
const { getAllClients } = require("../../controller/AdminRequest/GetClients");
const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");

GetAllClientByAdminRouter.get(
  "/admin/get_client",
  AdminVerifyAuth,
  getAllClients
);

module.exports = { GetAllClientByAdminRouter };
