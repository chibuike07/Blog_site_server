const nodemailer = require("nodemailer");
// const dotenv = require("dotenv").config();

//sending email to the user
exports.ResetPasswordMessage = async (
  signupClientEmail,
  password,
  req,
  res
) => {
  const { EMAIL, PASSWORD } = process.env;

  //defining the message porter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      type: "login",
      port: 465,
      pass: PASSWORD,
      user: EMAIL,
    },
  });

  // message option
  let mailOptions = {
    from: `${EMAIL}`,
    to: signupClientEmail,
    subject: "Change Of Password",
    html: `<5>Change Of Password </h5>
      <p>Email: ${signupClientEmail}\n password: ${password}</p>

        <p> your new pass password is ${password}</p>

      <span>you may as well click on the link below to get you signed in</span>

      <a href=${req.headers.origin}/user/${signupClientEmail}/${password}>log in</a>
      `,
  };

  //transporting the mail to the user
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw err;
    } else {
      return res.status(200).json({
        message: "check your email for your new password",
        status: "success",
      });
    }
  });
};
