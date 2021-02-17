const DeleteSpecifiedClientByAdminRouter = require("express").Router();
const AdminVerifyAuth = require("../../middleware/Authentication/AdminVerifyAuth");
const {
  deleteOneClient,
} = require("../../controller/AdminRequest/DeleteClients");

DeleteSpecifiedClientByAdminRouter.delete(
  "/admin/clear_client/:clientId",
  AdminVerifyAuth,
  deleteOneClient
);

module.exports = { DeleteSpecifiedClientByAdminRouter };
