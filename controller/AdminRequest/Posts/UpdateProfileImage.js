const { ClientSignUp } = require("../../model/ClientSignUp");

exports.upLoadImage = async (req, res) => {
  const { _id } = req.client;
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
