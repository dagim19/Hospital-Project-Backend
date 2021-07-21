let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Person = require("./person.js");
require("mongoose-type-email");

let doctorSchema = new Schema(
  {
    contactInfo: {
      type: Person,
      require: true
    },
    intern: {
      type: Boolean,
      default: false
    },
    partime: {
      type: Boolean,
      default: false
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