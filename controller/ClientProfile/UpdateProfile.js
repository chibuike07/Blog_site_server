const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.UpdateProfile = async (req, res) => {
  //destructuring updated data
  const {
    firstName,
    lastName,
    email,
    password,
    contact,
    profileImage,
    ClientLoggedInIpAddress,
    phone,
    posts,
  } = req.body;

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
    { _id: req.client._id },

    //updating all the specified data
    {
      $set: wrapper,
    },

    //ignoring undefined data and adding the property that had not existed
    { omitUndefined: true, upsert: true, new: true },

    (err, updated) => {
      if (err) {
        //sending error if error
        return res.status(400).json({
          message: `the error was becauser ${err}`,
          status: "error",
        });
      } else {
        return res.status(200).json({
          data: updated.interest,
          message: "profile updated successfully",
          status: "success",
        });
      }
    }
  );
};
