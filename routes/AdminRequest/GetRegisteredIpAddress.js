const GetRegisteredIpAddressByAdminRouter = require("express").Router();

const {
  getRegisteredIpAddress,
} = require("../../controller/AdminRequest/GetRegisteredIpAddress");

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

GetRegisteredIpAddressByAdminRouter.get(
  "/admin/registeredIp",
  // ClientVerifyAuth,
  getRegisteredIpAddress
);

module.exports = { GetRegisteredIpAddressByAdminRouter };
