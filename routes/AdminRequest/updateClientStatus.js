const UpdateOneClientStatusByAdminRouter = require("express").Router();

const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");

const {
  updateClientStatus,
} = require("../../controller/AdminRequest/updateClientStatus");

UpdateOneClientStatusByAdminRouter.put(
  "/admin/update_client_status/:userId",
  AdminVerifyAuth,
  updateClientStatus
);

module.exports = {
  UpdateOneClientStatusByAdminRouter,
};
