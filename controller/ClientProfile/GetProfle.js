const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.getuserProfile = async (req, res) => {
  //specifying things to send to the client
  const User = await ClientSignUp.find({ _id: req.client._id }, [
    "firstName",
    "lastName",
    "email",
    "password",
    "contact",
    "profileImage",
    "ClientLoggedInIpAddress",
    "phone",
    "posts",
  ]);

  //sending data to the client
  return res.status(200).json({
    data: User,
    status: "success",
  });
};
