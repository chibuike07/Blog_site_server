const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  AdminSigninValidation,
} = require("../../middleware/Validators/AdminValidation/AdminSignInValidation");

const { AdminSignUp } = require("../../model/AdminSignUp");
const AdminGeneratedToken = require("../../middleware/Authentication/AdminGeneratedToken");
const { Role } = require("../../util/Role");

module.exports.postAdminLogin = async (req, res, next) => {
  //getting email and password of the the user
  const { email, password } = req.body;

  //checking for error
  const { error } = AdminSigninValidation.validate(req.body);

  if (error) {
    //send a message if error
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  //checking if email exist in the database
  const Admin = await AdminSignUp.findOne({
    email: email,
  });

  if (!Admin) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const isValid = await bcrypt.compare(password, Admin.password);

  if (!isValid) {
    //verify using hash password
    return res.status(400).json({
      message: "password incorrect",
      status: "error",
    });
  }

  //checking if the header holds the token and sending the token to the vendor
  await AdminGeneratedToken(res, Admin._id, Admin.account_type);
};
