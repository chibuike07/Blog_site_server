const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.getOneClient = async (req, res) => {
  const { clientId } = req.params;

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
