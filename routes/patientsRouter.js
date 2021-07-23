const express = require("express");
const mongoose = require("mongoose");
let patientsRouter = express.Router();
let Patients = require("../models/patientsModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

let emergencyData = {
  firstName: "emergency",
  lastName: "emergency",
  gender: "emergency",
  age: "18",
  phoneNumber: "000000000",
  email: "emergency@gmail.com",
  nationality: "emergency",
  city: "emergency",
  address: "emergency",
}

patientsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const patients = await Patients.find({});
      res.status(200);
      res.type("json");
      res.json(patients);
    } catch (err) {
      console.log(`There is an error at /patients ${err}`);
      res.sendStatus(500);
    }
  })
  .post((req, res, next) => {
    res.sendStatus(405)
  })
  .put((req, res, next) => {
    res.sendStatus(405);
  })
  .delete((req, res, next) => {
    res.sendStatus(405);
  });

patientsRouter
  .route("/register")
  .post(async (req, res, next) => {
    let data = req.body;
    if (data.emergency == 'true') {
      data.contactInfo = emergencyData;
    }
    let patient = new Patients(data);

    try {
      await patient.save();
      let emailAdd = patient.contactInfo.email;
      let formattedDate =
        patient.createdAt.getFullYear() +
        "-" +
        (patient.createdAt.getMonth() + 1) +
        "-" +
        patient.createdAt.getDate();

      let mailOptions = {
        from: "dagim.ashenafi.birru@gmail.com",
        to: emailAdd,
        subject: "Your registration at our hospital",
        text: `Hi, ${patient.gender == "male" || patient.gender == "m"
          ? "Mr. " + patient.firstName
          : "Ms. " + patient.firstName
          } 
        you have been registered at our hospital on day ${formattedDate} 
        Please wait for us patiently until we contact you.Thanks.`,
      };

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
      res.status(200);
      res.type("json");
      res.json(patient);
      //res.redirect("/patients");
    } catch (err) {
      console.log(
        `There is an error /patients/register route PUT method ${err}`
      );
      res.sendStatus(400);
    }
  })
  .put((req, res, next) => {
    res.sendStatus(405);
  })
  .delete((req, res, next) => {
    res.sendStatus(405);
  })

patientsRouter
  .route("/:patientId")
  .get(async (req, res, next) => {
    try {
      const patientFound = await Patients.findById(req.params.patientId);
      res.status(200);
      res.type("json");
      res.json(patientFound);
    } catch (err) {
      console.log(`There is an error at /:patientId route GET request ${err}`);
      res.sendStatus(400);
    }
  })
  .post((req, res, next) => {
    res.status(403);
    res.type("text");
    res.end("Post method is not supported");
  })
  .put(async (req, res, next) => {
    try {
      data = await Patients.findOneAndUpdate(
        req.params.patientId,
        { $set: req.body },
        { new: true }
      );
      res.status(200);
      res.type("json");
      res.json(data);
    } catch (err) {
      console.log(`There is an error updating your document: ${err}`);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Patients.findOneAndRemove({ _id: req.params.patientId });
      res.status = 200;
      res.redirect("/patients");
    } catch (err) {
      console.log(`There was an error removing your document`);
      next(err);
    }
  });

patientsRouter
  .route("/:patientId/contactInfo")
  .get(async (req, res, next) => {
    try {
      const patientFound = await Patients.findById(req.params.patientId);
      const contactInfo = patientFound.contactInfo;
      res.status(200);
      res.type("json");
      res.json(contactInfo);
    } catch (err) {
      console.log(`There is an error at /:patientId route GET request ${err}`);
      next(err);
    }
  })
  .post((req, res, next) => {
    res.status(403);
    res.type("text");
    res.end("Post method is not supported");
  })
  .put(async (req, res, next) => {
    try {
      data = await Patients.findOneAndUpdate(
        req.params.patientId,
        { $set: req.body },
        { new: true }
      );
      res.status(200);
      res.type("json");
      res.json(data);
    } catch (err) {
      console.log(`There is an error updating your document: ${err}`);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Patients.findOneAndRemove({ _id: req.params.patientId });
      res.status = 200;
      res.redirect("/patients");
    } catch (err) {
      console.log(`There was an error removing your document`);
      next(err);
    }
  });



module.exports = patientsRouter;
