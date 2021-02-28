const { ClientSignUp } = require("../../model/ClientSignUp");
const { AdminSignUp } = require("../../model/AdminSignUp");

module.exports.deleteOneClient = async (req, res) => {
  const { clientId } = req.params;
  console.log("clientId", clientId);
  const { id } = req.admin;

  const checkRole = await AdminSignUp.find({ _id: id });

  if (!checkRole.length) {
    return res.status(403).json({
      message: "access denied",
      status: "error",
    });
  }

  // getting one user
  const Client = await ClientSignUp.findOneAndDelete({ _id: clientId });

  //check for error
  if (!Client) {
    return res.status(401).json({
      message: "Sorry, your request didn't went successful. please try again",
      status: "error",
    });
  }

  //send the found data to the client
  return res.status(200).json({
    message: "Client deleted successfully",
    status: "success",
  });
};
