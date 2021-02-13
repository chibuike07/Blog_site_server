const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  AdminSigninValidation,
} = require("../../middleware/Validators/AdminValidation/AdminSignInValidation");
const { AdminSignUp } = require("../../model/AdminSignUp");

module.exports.postAdminLogin = async (req, res, next) => {
  //getting email and password of the the user
  const { email, password } = req.body;
  const { SUPER_TOKEN_SECRETE, SUPER_TOKEN_KEY } = process.env; // getting the token secret

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
  const Admin = await AdminSignUp.findOne({ email: email });

  if (!Admin) {
    return res.status(400).json({ message: "email or password incorrect" });
  }

  const isValid = await bcrypt.compare(password, Admin.password);

  if (!isValid) {
    //verify using hash password
    return res.status(400).json({
      message: "password incorrect",
      status: "error",
    });
  }

  //signing a token that will expire every 24hours
  const token = jwt.sign({ _id: Admin._id }, SUPER_TOKEN_SECRETE, {
    expiresIn: "24h", // expires in 24 hours
  });

  //checking if the header holds the token and sending the token to the vendor
  res
    .cookie(SUPER_TOKEN_KEY, token, {
      expires: new Date(new Date() + 86400000),
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
    })
    .json({
      message: "login successful",
      status: "success",
      token,
      role: "user",
    });
};
