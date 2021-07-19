const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
let Doctors = require("../models/doctorsModel");


let doctorsRouter = express.Router();
doctorsRouter
    .route("/")
    .get(async (req, res, next) => {
        try {
            const doctors = await Doctors.find({});
            res.status(200);
            res.type("json");
            res.json(doctors);
        } catch (err) {
            console.log(`There is an error at /doctors ${err}`);
            next(err);
        }
    });

doctorsRouter
    .route("/register")
    .post(async (req, res, next) => {
        console.log(req.body);
        let doctor = new Doctors(req.body);
        try {
            await doctor.save();
            res.json(doctor);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    })

doctorsRouter
    .route("/:doctorId")
    .get(async (req, res, next) => {
        try {
            const doctorFound = await Doctors.findById(req.params.doctorId);
            res.status(200);
            res.type("json");
            res.json(doctorFound);
        } catch (err) {
            console.log(`There is an error at /:doctorId route GET request ${err}`);
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            data = await Doctors.findOneAndUpdate(
                req.params.doctorId,
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
            await Doctors.findOneAndRemove({ _id: req.params.doctorId });
            res.status = 200;
            res.redirect("/doctors");
        } catch (err) {
            console.log(`There was an error removing your document`);
            next(err);
        }
    });

module.exports = doctorsRouter;
