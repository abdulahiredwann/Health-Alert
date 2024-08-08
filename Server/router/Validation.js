const express = require("express");
const jwt = require("jsonwebtoken");
const { Patient } = require("../model/Patient");
const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).send("Token is required");
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    res.send({ valid: true });
  } catch (err) {
    res.status(401).send("Invalid token");
  }
});

router.get("/patient/:username", async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).send("Token is required");
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);

    const tokenUsername = decoded.username;

    // Check if the token's username matches the requested username
    if (tokenUsername !== req.params.username) {
      return res.status(403).send("Access denied. Invalid token.");
    }

    // Fetch the Patient's information using the username
    const patient = await Patient.findOne({ username: req.params.username });
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.status(200).send({ validTeacher: true }); // Ensure this key is what you are checking in the frontend
  } catch (error) {
    console.error("Error verifying token or fetching patient:", error.message); // Improved error message
    res.status(500).send("Server error");
  }
});
module.exports = router;
