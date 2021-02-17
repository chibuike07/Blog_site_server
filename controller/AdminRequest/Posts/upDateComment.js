const { ClientPostRequest } = require("../../model/ClientPosts");
const {
  UpdateCommentValidation,
} = require("../../middleware/Validators/ClientPostValidation/UpdateCommentValidation");
const { AdminSignUp } = require("../../../model/AdminSignUp");

module.exports.updateComment = async (req, res) => {
  //destructuring the req.body value;
  //getting the sent id
  const { post_id } = req.params;
  const { message } = req.body;
  const { role } = req.admin;

  //checking for errors
  const { error } = UpdateCommentValidation.validate(req.body);

  if (error) {
    //sending error message
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  const checkRole = await AdminSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }

  //updating comment
  await ClientPostRequest.updateOne(
    { _id: post_id },
    {
      $addToSet: {
        comment: {
          message: message,
          clientId: _id,
        },
      },
    },

    (err) => {
      if (err) {
        return res.status(400).json({
          message: "Your Update was not sucessful please try again" + error,

          status: "error",
        });
      }

      return res.status(200).json({
        message: "Your comment was sent successfully",
        status: "success",
      });
    }
  );
};
