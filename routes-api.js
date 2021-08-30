//added candidates for donations from lab work

const Candidates = require("./app/api/candidates");

module.exports = [
  { method: "GET", path: "/api/candidates", config: Candidates.find },
  { method: "GET", path: "/api/candidates/{id}", config: Candidates.findOne },
  { method: "POST", path: "/api/candidates", config: Candidates.create },
  { method: "POST", path: "/api/users/authenticate", config: Users.authenticate },
  { method: "DELETE", path: "/api/candidates/{id}", config: Candidates.deleteOne },
  { method: "DELETE", path: "/api/candidates", config: Candidates.deleteAll },
];
