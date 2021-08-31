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
      name: "demo_auth",
      password: "password-should-be-32-characters",
      isSecure: false,

      // name: process.env.cookie_name, session
      // password: process.env.cookie_password,
      //isSecure: false,
    },
    redirectTo: "/",
  });

  server.auth.default("session");
  server.route(require("./routes"));
  server.route(require("./routes-api"));

  var bellAuthOptions = {
    provider: "github",
    password: "github-encryption-password-secure",
    clientId: "f0df5679a6274e2378ff",
    isSecure: false,
  };

  server.auth.strategy("github-oauth", "bell", bellAuthOptions);

  server.auth.default("cookie-auth");

  server.route([
    {
      method: "GET",
      path: "/login",
      config: {
        auth: "github-oauth",
        handler: function (request, h) {
          if (request.auth.isAuthenticated) {
            request.cookieAuth.set(request.auth.credentials);
            return "Hello " + request.auth.credentials.profile.displayName;
          }
          return "Not logged in...";
        },
      },
    },
    {
      method: "GET",
      path: "/account",
      config: {
        auth: "cookie-auth",
        handler: function (request, h) {
          if (request.auth.isAuthenticated) {
            return request.auth.credentials.profile;
          }
        },
      },
    },
    {
      method: "GET",
      path: "/userinfo",
      config: {
        auth: "cookie-auth",
        handler: function (request, h) {
          if (request.auth.isAuthenticated) {
            return (
              "<h2>From your GitHub profile</h2>" +
              "<b>User name:</b> " +
              request.auth.credentials.profile.username +
              "<br><b>Display name:</b> " +
              request.auth.credentials.profile.displayName +
              "<br><b>Email address:</b> " +
              request.auth.credentials.profile.email +
              "<br><b>Affiliation:</b> " +
              request.auth.credentials.profile.raw.company
            );
          }
        },
      },
    },
    {
      method: "GET",
      path: "/",
      config: {
        auth: {
          mode: "optional",
        },
        handler: function (request, h) {
          if (request.auth.isAuthenticated) {
            return "Hello " + request.auth.credentials.profile.displayName;
          }
          return "Not logged in...";
        },
      },
    },
    {
      method: "GET",
      path: "/logout",
      config: {
        auth: false,
        handler: function (request, h) {
          request.cookieAuth.clear();
          return "Logged out now! Note you are just logged out of this app and not GitHub. Going to /login will log you back in again.";
        },
      },
    },
  ]);

  main()
    .then((server) => console.log(`Server listening on ${server.info.uri}`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
