"use strict";
const express = require("express");
require("dotenv").config();
const axios = require("axios");
require("./config/mongoConnection"); //mongodb connection
const bodyParser = require("body-parser");

const pokedexRoute = require("./routes/pokedexRoute");

const app = express();

let env = process.env.ENV || "dev";
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

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
