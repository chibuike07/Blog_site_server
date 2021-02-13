const { ClientSignUp } = require("../../../model/ClientSignUp");

module.exports.getLatestLogedInData = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const LatestloginedClients = await ClientSignUp.find(
    { loginTime: { $exists: true, $ne: "" } },
    ["loginTime", "ClientLoggedInIpAddress", "loggedIn"]
  );

  if (!LatestloginedClients) {
    return res.status(400).json({
      message: "No login time property was found",
      status: "error",
    });
  }

  const loginTimeData = LatestloginedClients.sort(
    (a, b) => new Date(b.loginTime) - new Date(a.loginTime)
  );

  if (LatestloginedClients.length < 1) {
    return res.status(204).json({
      message: "Empty data was return",
      status: "infor",
    });
  }

  return res.status(200).json({ data: loginTimeData[0], status: "success" });
};
