const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.UpdateLoggerStatus = async (req, res) => {
  const { _id, role } = req.client;

  const { loggedIn } = req.body;

  const checkRole = ClientSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }

  const ClientPost = await ClientSignUp.findByIdAndUpdate(
    { _id: _id },
    {
      $set: { loggedIn: loggedIn, loginTime: "" },
    },
    (err) => {
      if (err) {
        return res.status(400).json({
          message: "sorry please try again",
          status: "error",
        });
      } else {
        return res.status(200).json({
          message: "You are now log out. Bye!!!",
          status: "success",
        });
      }
    }
  );
};
