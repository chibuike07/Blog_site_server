const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.UpdateProfileByAdmin = async (req, res) => {
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

  const { clientId } = req.params;
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
    { _id: clientId },

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
          message: `the error was because ${err}`,
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
