const nodemailer = require("nodemailer");
// const dotenv = require("dotenv").config();

//sending email to the user
exports.ResetEmail = async (signupClientEmail, req, resetToken) => {
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
    subject: "Reset Password",
    html: `<h5>You registered for password reset</h5>
    
    <p>
    Find a <a href=${process.env.ORIGINPATH}/reset_password/${resetToken} >link </a> to reset your password
    </p>
      `,
  };

  //transporting the mail to the user
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(400).json({
        message: "please verify your email",
        status: "error",
      });
    } else {
      return res.status(200).json({
        message: "email sent successfully!",
        status: "success",
      });
    }
  });
};
