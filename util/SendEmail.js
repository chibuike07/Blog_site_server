const nodemailer = require("nodemailer");
// const dotenv = require("dotenv").config();

//sending email to the user
exports.SendEmail = async (signupClientEmail, password, req) => {
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
    subject: "library app",
    html: `<h1>HELLO 
    
    </h1> <p>This mail is from Netapps Technology,</p> 
    <p>Thank you for signing up with us.</p>
     <p>This are your login details below.</p>
      <p>Email: ${signupClientEmail}\n password: ${password}</p>

      <span>you may as well click on the link below to get you signed in</span>

      <a href=${req.headers.origin}/user?email=${signupClientEmail}&password=${password}>log in</a>
      `,
  };

  //transporting the mail to the user
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("can not send email", err);
    } else {
      console.log("email successfully sent!", info.response);
    }
  });
};
