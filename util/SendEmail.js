const nodemailer = require("nodemailer");
// const dotenv = require("dotenv").config();

//sending email to the user
exports.SendEmail = async (signupClientEmail, password, req, res) => {
  const { EMAIL, PASSWORD } = process.env;

  //defining the message porter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      // type: "login",
      port: 465,
      pass: PASSWORD,
      user: EMAIL,
    },
  });

  // message option
  let mailOptions = {
    from: `${EMAIL}`,
    to: signupClientEmail,
    subject: "Registration",
    html: `<h1>HELLO 
    
    </h1> <p>This mail is from Netapps Technology,</p> 
    <p>Thank you for signing up with us.</p>
     <p>This are your login details below.</p>
      <p>Email: ${signupClientEmail}\n password: ${password}</p>

      <span>you may as well click on the link below to get you signed in</span>

      <a href=${req.headers.origin}/user/${signupClientEmail}/${password}>log in</a>
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
        message: "Your login link has been sent to your email.",
        status: "success",
      });
    }
  });
};
