const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.getuserProfile = async (req, res) => {
  //specifying things to send to the client

  const checkRole = ClientSignUp.find({
    account_type: req.client.role,
  });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }

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
