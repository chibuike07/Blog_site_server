const { ClientSignUp } = require("../../model/ClientSignUp");
const {
  profileUpdateValidation,
} = require("../../middleware/Validators/ClientValidation/UpdateClientProfileValidation");

module.exports.UpdateProfile = async (req, res) => {
  //destructuring updated data
  const {
    firstName,
    lastName,
    email,
    contact,
    profileImage,
    ClientLoggedInIpAddress,
    phone,
    posts,
  } = req.body;

  const { error } = profileUpdateValidation.validate(req.body);

  if (error) {
    //sending error message
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  //assigning the updated data to wrapper
  let wrapper = {
    firstName,
    lastName,
    email,
    contact,
    profileImage,
    ClientLoggedInIpAddress,
    phone,
    posts,
  };

  //updating the client profile data;
  const updatePersonalData = await ClientSignUp.findOneAndUpdate(
    { _id: req.client.id, active: true },

    //updating all the specified data
    {
      $set: wrapper,
    },

    //ignoring undefined data and adding the property that had not existed
    { omitUndefined: true, upsert: true, new: true },

    (err) => {
      if (err) {
        //sending error if error
        return res.status(400).json({
          message:
            "access denied. seems you have been deactived from performing any actions or you don't have the rights!  Please contact the admin",
          status: "error",
        });
      } else {
        return res.status(200).json({
          message: "profile updated successfully",
          status: "success",
        });
      }
    }
  );
};
