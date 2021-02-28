const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.UpdateLoggerStatus = async (req, res) => {
  const { id } = req.client;

  const { loggedIn } = req.body;

  const ClientPost = await ClientSignUp.findByIdAndUpdate(
    { _id: id },
    {
      $set: { loggedIn: loggedIn },
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
