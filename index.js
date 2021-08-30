"use strict";
const os = require("os"); //
os.tmpDir = os.tmpdir; //
const Bell = require("@hapi/bell"); //
const AuthCookie = require("@hapi/cookie"); //

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Handlebars = require("handlebars");
const Cookie = require("@hapi/cookie");
const Joi = require("@hapi/joi");
require("./app/models/db");
const env = require("dotenv");

const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const server = Hapi.server({
  port: process.env.PORT || 5010,
});

async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register([Bell, AuthCookie]);
  server.validator(require("@hapi/joi"));
  server.views({
    engines: {
      hbs: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "./app/views",
    layoutPath: "./app/views/layouts",
    partialsPath: "./app/views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("cookie-auth", "cookie", {
    cookie: {
      name: "demo_auth", // Name of auth cookie to be set
      password: "password-should-be-32-characters", // String used to encrypt cookie
      isSecure: false, // Should be 'true' i

      // name: process.env.cookie_name, session
      // password: process.env.cookie_password,
      //isSecure: false,
    },
    redirectTo: "/",
  });
  server.auth.default("session");
  server.route(require("./routes"));
  server.route(require("./routes-api"));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
