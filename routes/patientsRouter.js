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
      next(err);
    }
  })
  .post((req, res, next) => {
    res.status(403);
    res.type(json);
    res.json("Post is not allowed!");
  })
  .put((req, res, next) => {
    res.status(403);
    res.type("text");
    res.json("Put is not allowed!");
  })
  .delete((req, res, next) => {
    res.status(403);
    res.type("text");
    res.end("Delete is not allowed!");
  });

patientsRouter
  .route("/register")
  .post(async (req, res, next) => {
    console.log(req.body);
    let patient = new Patients(req.body);

    try {
      await patient.save();
      let emailAdd = patient.email;
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
      res.json(patient);
      //res.redirect("/patients");
    } catch (err) {
      console.log(
        `There is an error /patients/register route PUT method ${err}`
      );
      res.json(err);
    }
  })
  .put((req, res, next) => {
    res.status(200);
    res.type("text");
    res.end("Put is not supported");
  });

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
