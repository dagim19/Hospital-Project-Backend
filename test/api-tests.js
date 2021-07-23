const chai = require("chai");
const assert = chai.assert;

const server = require("../app");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("API tests", function () {


    suite("Patients router", function () {

        // test for handling /patients request
        suite("/paients end point", function () {
            test("GET /patients end point", function (done) {
                chai
                    .request(server)
                    .get("/patients")
                    .end(function (err, res) {
                        assert.equal(res.status, 200, "Response status must be 200");
                        assert.equal(res.type, 'application/json', "/patients end point must return a json");
                        done();
                    })
            })
            test("POST /patients end point", function (done) {
                chai
                    .request(server)
                    .post("/patients")
                    .end(function (err, res) {
                        assert.equal(res.status, 405, "Your response status must be 403");
                        done();
                    })
            })
            test("PUT /patients end point", function (done) {
                chai
                    .request(server)
                    .put("/patients")
                    .end(function (err, res) {
                        assert.equal(res.status, 405, "Your response status must be 403");
                        done();
                    })
            })
            test("DELETE /patients end point", function (done) {
                chai
                    .request(server)
                    .delete("/patients")
                    .end(function (err, res) {
                        assert.equal(res.status, 405, "Your response status must be 403");
                        done();
                    })
            })
        })

        // test for handling the /paients/register request
        suite("/patients/register end point", function () {
            test("POST /patients end point", function (done) {
                chai
                    .request(server)
                    .post("/patients/register")
                    .send({
                        "contactInfo": {
                            "firstName": "Dagim",
                            "lastName": "Ashenafi",
                            "gender": "Male",
                            "age": "20",
                            "phoneNumber": "0979075546",
                            "email": "dagim@gmail.com",
                            "nationality": "Ethiopian",
                            "city": "Addis Ababa",
                            "address": "jemo 1"
                        },
                        "emergency": "false",
                        "critical": "false"
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200, "Your response status must be 200");
                        assert.equal(res.type, "application/json", "Your response type must be json");
                        done();
                    })
            })
            test("PUT /patients end point", function (done) {
                chai
                    .request(server)
                    .put("/patients")
                    .end(function (err, res) {
                        assert.equal(res.status, 405, "Your response status must be 403");
                        done();
                    })
            })
            test("DELETE /patients/register end point", function (done) {
                chai
                    .request(server)
                    .delete("/patients/register")
                    .end(function (err, res) {
                        assert.equal(res.status, 405, "Your response status must be 403");
                        done();
                    })
            })
        })
    })

    suite("Doctors router", function () {
        suite("/doctors end point", function () {
            test("Get /doctors", function (done) {
                chai
                    .request(server)
                    .get("/doctors")
                    .end(function (err, res) {
                        assert.equal(res.status, 200, "response status must be 200");
                        assert.equal(res.type, "application/json", "response type must be json");
                        done();
                    })
            })

            test("POST /doctors end point", function (done) {
                chai
                    .request(server)
                    .post("/doctors")
                    .end(function (err, res) {
                        assert.equal(res.status, 405, "Your response status must be 403");
                        done();
                    })
            })
            test("PUT /doctors end point", function (done) {
                chai
                    .request(server)
                    .put("/doctors")
                    .end(function (err, res) {
                        assert.equal(res.status, 405, "Your response status must be 403");
                        done();
                    })
            })
            test("DELETE /doctors end point", function (done) {
                chai
                    .request(server)
                    .delete("/doctors")
                    .end(function (err, res) {
                        assert.equal(res.status, 405, "Your response status must be 403");
                        done();
                    })
            })
        })
    })

})