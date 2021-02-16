const { ClientSignUp } = require("../../model/ClientSignUp");

exports.upLoadImage = async (req, res) => {
  const { _id, role } = req.client;

  const checkRole = ClientSignUp.find({ account_type: role, active: true });

  if (!checkRole) {
    return res.status(403).json({
      message:
        "access denied. seems you have been deactived from performing any actions or you don't have the rights!  Please contact the admin",
      status: "error",
    });
  }

  await ClientSignUp.findOneAndUpdate(
    { _id: _id },
    { $set: { profileImage: req.file.path } },
    { new: true },
    (err, updated) => {
      if (err) {
        return res.status(400).json({
          message:
            "error occured while trying to upload image, kindly try again",
          status: "error",
        });
      } else {
        return res.status(200).json({
          message: "Update successfully",
          status: "success",
          data: updated,
        });
      }
    }
  );
};
