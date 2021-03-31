const Donations = require("./app/controllers/donations");

module.exports = [
  {
    method: "GET",
    path: "/",
    config: "./public",
  },
  {
    method: "GET",
    path: "/",
    config: Donations.index,
  },
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
