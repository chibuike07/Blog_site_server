const UpdateOneClientProfileByAdminRouter = require("express").Router();

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");
const {
  UpdateProfileByAdmin,
} = require("../../controller/AdminRequest/UpdateClientProfilebyAdmin");

UpdateOneClientProfileByAdminRouter.get(
  "/admin/put_client_profile/:clientId",
  // ClientVerifyAuth,
  UpdateProfileByAdmin
);

module.exports = {
  UpdateOneClientProfileByAdminRouter,
};
