const GetRegisteredIpAddressByAdminRouter = require("express").Router();

const {
  SuperVerifiedAuth,
} = require("../../middleware/Authentication/SuperVerifiedAuth");

const {
  getRegisteredIpAddress,
} = require("../../controller/AdminRequest/GetRegisteredIpAddress");

GetRegisteredIpAddressByAdminRouter.get(
  "/admin/registeredIp",
  // SuperVerifiedAuth,
  getRegisteredIpAddress
);

module.exports = { GetRegisteredIpAddressByAdminRouter };
