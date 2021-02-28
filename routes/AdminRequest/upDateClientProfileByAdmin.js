const UpdateOneClientProfileByAdminRouter = require("express").Router();

const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");
const {
  UpdateProfileByAdmin,
} = require("../../controller/AdminRequest/UpdateClientProfilebyAdmin");

UpdateOneClientProfileByAdminRouter.put(
  "/admin/put_client_profile/:clientId",
  AdminVerifyAuth,
  UpdateProfileByAdmin
);

module.exports = {
  UpdateOneClientProfileByAdminRouter,
};
