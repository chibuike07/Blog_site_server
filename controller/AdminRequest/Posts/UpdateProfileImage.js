const { ClientSignUp } = require("../../model/ClientSignUp");
const { AdminSignUp } = require("../../../model/AdminSignUp");

exports.upLoadImage = async (req, res) => {
  const { _id } = req.client;

  const { role } = req.admin;

  const checkRole = await AdminSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
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
