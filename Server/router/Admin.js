const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const { validateAdmin, Admin } = require("../model/Admin");
const { validateLogin } = require("../model/Patient");
const bcrypt = require("bcrypt");

// Creat Admin only for IT persone
router.post("/", async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const { error } = validateAdmin(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).send("Username is alrady Registerd!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let newAdmin = new Admin({
      name,
      password: hashedPassword,
      username,
    });

    await newAdmin.save();
    res.status(201).send(_.omit(newAdmin.toObject(), ["password"]));
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(400).send("Inavlid Username or Password!");
  }
  const validatePassowrd = await bcrypt.compare(password, admin.password);
  if (!validatePassowrd) {
    return res.status(400).send("Invalid Username or Password!");
  }
  const token = admin.generateAuthToken();
  res.status(200).send({ token });
});

module.exports = router;
