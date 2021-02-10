const { postAdminLogin } = require("../../controller/Admin_reg/adminLogin");

const AdminLoginRouter = require("express").Router();

AdminLoginRouter.post("/admin/login", postAdminLogin);

module.exports = { AdminLoginRouter };
