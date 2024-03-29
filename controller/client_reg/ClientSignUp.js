const bcrypt = require("bcryptjs");

const { ClientSignUp } = require("../../model/ClientSignUp");
const { SendEmail } = require("../../util/SendEmail");
const {
  ClientSignUpValidation,
} = require("../../middleware/Validators/ClientValidation/ClientSignUpValidation");
const { Role } = require("../../util/Role");

exports.ClientPostSignUp = async (req, res) => {
  //destructure the req body
  const { firstName, lastName, email, password } = req.body;
  let registeredIpAddress = req.connection.remoteAddress.split(":")[3];

  //checking for error
  const { error } = ClientSignUpValidation.validate(req.body);

  if (error) {
    //send a message if error
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  //checking if email exist
  const emailExist = await ClientSignUp.findOne({ email: email });

  if (emailExist) {
    return res
      .status(401)
      .json({ message: "user already exist", status: "error" });
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
          try {
            //saving the new member to mongodb
            const client = ClientSignUp.create({
              //creating an instance of Client data
              email,
              firstName,
              lastName,
              registeredIpAddress,
              account_type: Role.CLIENT,
              password: hash,
            });

            await SendEmail(email, password, req, res);
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
