const GetAllClientByAdminRouter = require("express").Router();
const { getAllClients } = require("../../controller/AdminRequest/GetClients");
const {
  SuperVerifiedAuth,
} = require("../../middleware/Authentication/SuperVerifiedAuth");

GetAllClientByAdminRouter.get(
  "/admin/get_client",
  // SuperVerifiedAuth,
  getAllClients
);

module.exports = { GetAllClientByAdminRouter };
