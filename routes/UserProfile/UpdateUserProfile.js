const {
  UpdateProfile,
} = require("../../controller/ClientProfile/UpdateProfile");

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

const UpdateUserProfileRouter = require("express").Router();
UpdateUserProfileRouter.put(
  "/user/update_profile",
  ClientVerifyAuth,
  UpdateProfile
);

module.exports = UpdateUserProfileRouter;
