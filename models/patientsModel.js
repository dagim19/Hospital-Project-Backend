let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Person = require("./person.js");
console.log(`Person: ${Person}`);
require("mongoose-type-email");
require("mongoose-type-phone");
let patientSchema = new Schema(
  {
    contactInfo: {
      type: Person,
      require: true
    },
    emergency: {
      type: Boolean,
      default: false
    },
    critical: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

let Patients = mongoose.model("Patient", patientSchema);
module.exports = Patients;
