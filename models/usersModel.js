const mongoose = require('mongoose');
require('mongoose-type-email');
const Person = require("./person.js");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    contactInfo: {
        type: Person,
        require: true
    },
    role: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});