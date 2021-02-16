const UpdateOneClientStatusByAdminRouter = require("express").Router();

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

const {
  updateClientStatus,
} = require("../../controller/AdminRequest/updateClientStatus");

UpdateOneClientStatusByAdminRouter.put(
  "/admin/update_client_status/:userId",
  // ClientVerifyAuth,
  updateClientStatus
);

module.exports = {
  UpdateOneClientStatusByAdminRouter,
};
