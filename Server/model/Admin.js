const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isAdmin: true,
    },
    process.env.jwtPrivateKey
  );

  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

function validateAdmin(admin) {
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
    name: Joi.string().min(4).max(20).required(),
  });
  return schema.validate(admin);
}

module.exports.Admin = Admin;
module.exports.validateAdmin = validateAdmin;
