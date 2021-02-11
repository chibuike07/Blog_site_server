const { ClientPostRequest } = require("../../model/ClientPosts");

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;

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
