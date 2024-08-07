const express = require("express");
const { Patient } = require("../model/Patient");
const { Admin } = require("../model/Admin");
const { Doctor } = require("../model/Doctor");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

// Apply the authMiddleware to all routes in this file
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const { username } = req.user; // Extract username from the decoded token
    let user = await Patient.findOne({ username }).select(
      "username email fullName"
    );
    if (!user) {
      user = await Admin.findOne({ username }).select(
        "username email fullName"
      );
      if (!user) {
        user = await Doctor.findOne({ username }).select(
          "username email fullName"
        );
      }
    }

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
