const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const doctorSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
});

doctorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      doctor: true,
    },
    process.env.jwtPrivateKey
  );
  return token;
};
const Doctor = mongoose.model("Doctor", doctorSchema);

function ValidationDoctor(doctor) {
  const schema = Joi.object({
    username: Joi.string().required().min(4).max(20),
    fullName: Joi.string().required().min(4).max(20),
    phone: Joi.string().required().min(9).max(30),
    speciality: Joi.string().required().min(4).max(40),
    email: Joi.string().email().required(),
  });

  return schema.validate(doctor);
}

module.exports.Doctor = Doctor;
module.exports.Validate = ValidationDoctor;
