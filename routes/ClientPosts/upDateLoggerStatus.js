const ClientLoggerStatusRouter = require("express").Router();

const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");
const {
  UpdateLoggerStatus,
} = require("../../controller/ClientPostRequest/UpdateLoggerStatus");

ClientLoggerStatusRouter.put(
  "/logger_status",
  ClientVerifyAuth,
  UpdateLoggerStatus
);

module.exports = { ClientLoggerStatusRouter };
