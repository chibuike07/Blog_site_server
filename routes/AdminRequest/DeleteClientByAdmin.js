const DeleteSpecifiedClientByAdminRouter = require("express").Router();

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");
const {
  deleteOneClient,
} = require("../../controller/AdminRequest/DeleteClients");

DeleteSpecifiedClientByAdminRouter.get(
  "/admin/delete_client/:clientId",
  // ClientVerifyAuth,
  deleteOneClient
);

module.exports = { DeleteSpecifiedClientByAdminRouter };
