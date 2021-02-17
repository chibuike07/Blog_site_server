const { AdminSignUp } = require("../../../model/AdminSignUp");
const { Role } = require("../../../util/Role");
const { ClientSignUp } = require("../../../model/ClientSignUp");

module.exports.getLatestLogedInData = async (req, res) => {
  const { role } = req.admin;

  const checkRole = await AdminSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }
  const LatestloginedClients = await ClientSignUp.find(
    { loginTime: { $exists: true, $ne: "" } },
    ["loginTime", "ClientLoggedInIpAddress", "loggedIn"]
  );

  if (!LatestloginedClients) {
    return res.status(400).json({
      message: "No Client has ever logged in!",
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
