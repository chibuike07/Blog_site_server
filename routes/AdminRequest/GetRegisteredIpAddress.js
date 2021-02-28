const GetRegisteredIpAddressByAdminRouter = require("express").Router();
const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");
const {
  getRegisteredIpAddress,
} = require("../../controller/AdminRequest/GetRegisteredIpAddress");

GetRegisteredIpAddressByAdminRouter.get(
  "/admin/registeredIp",
  AdminVerifyAuth,
  getRegisteredIpAddress
);

module.exports = { GetRegisteredIpAddressByAdminRouter };
