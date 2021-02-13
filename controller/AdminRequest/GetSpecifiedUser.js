const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.getOneClient = async (req, res) => {
  const { clientId } = req.params;

  // getting one user
  const Client = await ClientSignUp.find({ _id: clientId }, [
    "firstName",
    "lastName",
    "phone",
    "email",
    "contact",
    "profileImage",
    "posts",
    "_id",
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
