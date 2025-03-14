const express = require("express");
require("dotenv").config();
require("./config/mongoConnection");
const bodyParser = require("body-parser");
const requestLogger = require("./middlewares/requestLogger");
const rateLimit = require("express-rate-limit");

const errors = require("./middlewares/errorHandler");
const pokedexRoute = require("./routes/pokedexRoute");
const swaggerDocs = require("./config/swaggerConfig");

const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message: "Too many requests from this IP, please try again later.", // error message
  standardHeaders: true, // Send RateLimit headers
  legacyHeaders: false, // Disable X-RateLimit headers
});

app.disable("x-powered-by"); // less hackers know about our stack
app.use(requestLogger); // log API calls
app.use("/api/v1/", limiter);

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
  console.log(`OpenAPI Docs available at ${process.env.HOST}:${port}/docs`);
});
