const bcrypt = require("bcryptjs");
const { AdminSignUp } = require("../../model/AdminSignUp");

const {
  AdminSignUpValidation,
} = require("../../middleware/Validators/AdminValidation/AdminSignUpValidation");
const { SendEmail } = require("../../util/SendEmail");

const { Role } = require("../../util/Role");
const { AdminSendEmail } = require("../../util/AdminSendMail");

exports.AdminPostSignUp = async (req, res) => {
  //destructure the req body
  const { email, password } = req.body;

  //checking for error
  const { error } = AdminSignUpValidation.validate(req.body);

  if (error) {
    //send a message if error
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  //checking if email exist
  const EmailExist = await AdminSignUp.findOne({
    email: email,
  });

  if (EmailExist) {
    return res
      .status(401)
      .json({ message: "admin already exist", status: "error" });
  }

  //assigning the salt to use
  const saltR = 10;

  bcrypt.genSalt(saltR, async (err, salt) => {
    if (err) {
      return res.status(400).json({
        message: "unathorized  error",
        status: "error",
      });
    } else {
      //hashing the password
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(401).json({
            message: "user validation failed",
            status: "error",
          });
        } else {
          const admin = await AdminSignUp.create({
            //creating an instance of Client data
            email,
            account_type: Role.ADMIN,
            password: hash,
          });

          //saving the new member to mongodb

          await AdminSendEmail(email, password, req, res);
        }
      });
    }
  });
};
