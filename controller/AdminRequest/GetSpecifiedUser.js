const { ClientSignUp } = require("../../model/ClientSignUp");
const { AdminSignUp } = require("../../model/AdminSignUp");

module.exports.getOneClient = async (req, res) => {
  const { userId } = req.params;

  const { id } = req.admin;

  const checkRole = await AdminSignUp.find({ _id: id });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }
  // getting one user
  const Client = await ClientSignUp.find({ _id: userId }, [
    "firstName",
    "lastName",
    "phone",
    "email",
    "contact",
    "profileImage",
    "posts",
    "_id",
    "ClientLoggedInIpAddress",
    "phone",
    "posts",
    "createdAt",
  ]);

  //check for error
  if (!Client) {
    return res.status(401).json({
      message: "Client not found!",
      status: "error",
    });
  }

  //check if an empty array was returned

  if (Client.length < 1) {
    return res.status(204).json({
      infor: "User does not exist!!!",
      status: "success",
    });
  }

  //send the found data to the client
  return res.status(200).json({
    data: Client,
    status: "success",
  });
};
