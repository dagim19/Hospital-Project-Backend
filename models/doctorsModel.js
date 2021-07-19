let mongoose = require("mongoose");
let Schema = mongoose.Schema;
require("mongoose-type-email");

let doctorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      require: true,
    },
    speciality: {
      type: String,
      default: "General Doctor",
    },
  },
  {
    timestamps: true,
  }
);

let Doctors = mongoose.model('Doctor', doctorSchema);
module.exports = Doctors;