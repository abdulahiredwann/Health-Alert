const jwt = require("jsonwebtoken");

function auth_Doctor(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).send("Access Denied ,No token Provided!");
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user - decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}
