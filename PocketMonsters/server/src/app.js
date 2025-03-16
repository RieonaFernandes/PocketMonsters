const express = require("express");
require("dotenv").config();
require("./config/mongoConnection");
const bodyParser = require("body-parser");
const requestLogger = require("./middlewares/requestLogger");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

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
const corsOptions = {
  origin: process.env.URLs, // restrict access
  methods: ["GET"], // allow only GET requests
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.disable("x-powered-by"); // less hackers know about our stack
app.use(requestLogger); // log API calls
app.use("/api/v1/", limiter);

const port = process.env.PORT || 8080;

// configure app to use bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers in order to perform all operation on API (CORS)
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Header", "*");

  // Encrypting the traffic
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }

  //set CSP to restricts the loading of resources to the same origin ('self'), not allows embedding the page in a frame, only allows connections to the same origin, and prevents the loading of plugins or embedded objects.
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; "frame-ancestors 'none'; connect-src 'self'; object-src 'none';`
  );
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
