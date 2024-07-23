const jwt = require("jsonwebtoken");

function auth_patient(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).send("Access Denied. No token Provided!");
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

function authorized_Patient(req, res, next) {
  if (!req.user || !req.user.patient) {
    return res.status(403).send("Access Denied!");
  }
  next();
}

module.exports = {
  auth_patient,
  authorized_Patient,
};
