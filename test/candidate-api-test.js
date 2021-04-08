"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("Candidate API tests", function () {
  test("get candidates", async function () {
    const response = await axios.get("http://localhost:5010/api/candidates");
    const candidates = response.data;
    assert.equal(2, candidates.length);

    assert.equal(candidates[0].firstName, "mary");
    assert.equal(candidates[0].lastName, "lowe");
    assert.equal(candidates[0].office, "chairman");

    assert.equal(candidates[1].firstName, "ann");
    assert.equal(candidates[1].lastName, "ryan");
    assert.equal(candidates[1].office, "accountant");
  });

  test("get one candidate", async function () {
    let response = await axios.get("http://localhost:5010/api/candidates");
    const candidates = response.data;
    assert.equal(2, candidates.length);

    const oneCandidateUrl = "http://localhost:5010/api/candidates/" + candidates[0]._id;
    response = await axios.get(oneCandidateUrl);
    const oneCandidate = response.data;

    assert.equal(oneCandidate.firstName, "mary");
    assert.equal(oneCandidate.lastName, "lowe");
    assert.equal(oneCandidate.office, "chairman");
  });

  test("create a candidate", async function () {
    const candidatesUrl = "http://localhost:5010/api/candidates";
    const newCandidate = {
      firstName: "Ben",
      lastName: "dunne",
      office: "President",
    };

    const response = await axios.post(candidatesUrl, newCandidate);
    const returnedCandidate = response.data;
    assert.equal(201, response.status);

    assert.equal(returnedCandidate.firstName, "Ben");
    assert.equal(returnedCandidate.lastName, "dunne");
    assert.equal(returnedCandidate.office, "President");
  });
});
