"use strict";
const express = require("express");
require("dotenv").config();
const connect = require("./config/mongoConnection");
const bodyParser = require("body-parser");
const requestLogger = require("./middlewares/requestLogger");

const errors = require("./middlewares/errorHandler");
const pokedexRoute = require("./routes/pokedexRoute");
const swaggerDocs = require("./config/swaggerConfig");

const app = express();
app.disable("x-powered-by"); // less hackers know about our stack
// Log API calls
app.use(requestLogger);

const port = process.env.PORT || 8080;

// configure app to use bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers in order to perform all operation on API (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");

  next();
});

// ROUTES
app.use("/api/v1/", pokedexRoute);

app.use(errors.errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on ${process.env.HOST}:${port}`);
  swaggerDocs(app, port);
  // console.log(
  //   `OpenAPI Docs available at ${process.env.HOST}:${port}/api-docs`
  // );
});

// connect
//   .mongoose()
//   .then(() => {
//     try {
//       app.listen(port, () => {
//         console.log(`Server is running on ${process.env.HOST}:${port}`);
//       });
//       swaggerDocs(app, port);
//     } catch (error) {
//       console.log("Cannot connect to the server");
//     }
//   })
//   .catch((error) => {
//     console.log("Invalid database connection...!", error);
//   });
