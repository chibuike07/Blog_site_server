const { ClientSignUp } = require("../../model/ClientSignUp");
const { AdminSignUp } = require("../../model/AdminSignUp");

module.exports.updateClientStatus = async (req, res) => {
  const { userId } = req.params;
  const { active } = req.body;
  const { id } = req.admin;

  const checkRole = await AdminSignUp.find({ _id: id });

  if (!checkRole) {
    return res.status(403).json({
      message: "access denied",
      status: "error",
    });
  }

  // getting all the booked event
  const ClientStatus = await ClientSignUp.updateOne(
    { _id: userId },
    {
      $set: { active: active },
    }
  );

  //check for error
  if (!ClientStatus) {
    return res.status(401).json({
      message: "ID does not match!",
      status: "error",
    });
  }

  if (ClientStatus.length < 1) {
    return res.status(204).json({
      infor: "data is empty",
      status: "success",
    });
  }

  //send the found data to the client
  return res.status(200).json({
    message: "status changed successfully",
    status: "success",
  });
};
