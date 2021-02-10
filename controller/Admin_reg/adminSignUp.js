const bcrypt = require("bcryptjs");

const {
  AdminSignUpValidation,
} = require("../../middleware/AdminValidation/AdminSignUpValidation");
const { SendEmail } = require("../../util/SendEmail");
const { AdminSignUp } = require("../../model/AdminSignUp");

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
  const EmailExist = await AdminSignUp.findOne({ email: email });

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
          const admin = new AdminSignUp({
            //creating an instance of Client data
            email,
            password: hash,
          });

          try {
            //saving the new member to mongodb
            await admin.save();

            await SendEmail(email, password, req);
            return res.status(200).json({
              massage: "signup successful",
              data: admin,
              userId: admin._id,
              status: "success",
            });
          } catch (error) {
            res.status(400).json({
              message: error,
              status: "error",
            });
          }
        }
      });
    }
  });
};
