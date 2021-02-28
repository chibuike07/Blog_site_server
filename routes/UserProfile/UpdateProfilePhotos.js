const UploadProfileImageRouter = require("express").Router();
const { getuserProfile } = require("../../controller/ClientProfile/GetProfle");

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");
const {
  upLoadImage,
} = require("../../controller/ClientPostRequest/UpdateProfileImage");
const {
  userProfileImage,
} = require("../../middleware/CloudinaryVerification/cloudinaryVerification");

UploadProfileImageRouter.put(
  "/profile/image",
  ClientVerifyAuth,
  userProfileImage.single("file"),
  upLoadImage
);

module.exports = UploadProfileImageRouter;
