const Donations = require("./app/controllers/donations.js");
const Accounts = require("./app/controllers/accounts.js");
const Dashbord = require("./app/controllers/dashbord.js");

module.exports = [
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: "GET", path: "/", config: Dashbord.index },
  { method: "GET", path: "/signup", config: Dashbord.signup },
  { method: "GET", path: "/login", config: Dashbord.login },
  { method: "GET", path: "/", config: Donations.index },
  { method: "GET", path: "/signup", config: Donations.signup },
  { method: "GET", path: "/login", config: Donations.login },
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
  },
];
