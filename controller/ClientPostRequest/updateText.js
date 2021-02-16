const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { role } = req.client;

  const checkRole = ClientSignUp.find({ account_type: role, active: true });

  if (!checkRole) {
    return res.status(403).json({
      message:
        "access denied. seems you have been deactived from performing any actions or you don't have the rights!  Please contact the admin",
      status: "error",
    });
  }

  await ClientPostRequest.findByIdAndUpdate(
    id,
    req.body,

    { new: true },

    (err, updated) => {
      if (err) {
        return res.status(400).json({
          message:
            "please check your request data to see that you are updating the right thing",
          error: err,
          status: "error",
        });
      }

      return res.status(200).json({
        message: "update was successful",
        status: "success",
        updatedEvents: updated,
      });
    }
  );
};
