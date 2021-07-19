let mongoose = require("mongoose");
let Schema = mongoose.Schema;
require("mongoose-type-email");
require("mongoose-type-phone");
let patientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    symptoms: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Patients = mongoose.model("Patient", patientSchema);
module.exports = Patients;
