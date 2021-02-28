const GetUserProfileRouter = require("express").Router();
const { getuserProfile } = require("../../controller/ClientProfile/GetProfle");

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

GetUserProfileRouter.get("/user/get_profile", ClientVerifyAuth, getuserProfile);

module.exports = GetUserProfileRouter;
