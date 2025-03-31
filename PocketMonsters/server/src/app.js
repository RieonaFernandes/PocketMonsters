const express = require("express");
require("dotenv").config();
// require("./config/mongoConnection");
const mongoConnection = require("./config/mongoConnection"); // Changed from require to function reference
const bodyParser = require("body-parser");
const requestLogger = require("./middlewares/requestLogger");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const xssClean = require("xss-clean");
const helmet = require("helmet");

const errors = require("./middlewares/errorHandler");
const pokedexRoute = require("./routes/pokedexRoute");
const swaggerDocs = require("./config/swaggerConfig");

const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  // max: 500,
  max: process.env.ENV === "test" ? 10000 : 500, // limit each IP to 500 requests per windowMs
  message: "Too many requests from this IP, please try again later.", // error message
  standardHeaders: true, // Send RateLimit headers
  legacyHeaders: false, // Disable X-RateLimit headers
});
const corsOptions = {
  origin: process.env.URLs, // restrict access
  methods: ["GET"], // allow only GET requests
  allowedHeaders: ["Content-Type"],
};

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-scripts.example.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "cdn.example.com"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
      },
    },
  })
); // Basic security headers
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
  if (
    process.env.ENV === "prod" &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }

  //set CSP to restricts the loading of resources to the same origin ('self'), not allows embedding the page in a frame, only allows connections to the same origin, and prevents the loading of plugins or embedded objects.
  // res.setHeader(
  //   "Content-Security-Policy",
  //   `default-src 'self'; "frame-ancestors 'none'; connect-src 'self'; object-src 'none';`
  // );
  next();
});

// Can help protect the API against clickjacking attacks by ensuring that the application can't be embedded within an iframe.
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  next();
});
// In the future when there are API's that consume any user-generated content, this ensures that it is sanitized and escape HTML input.
app.use(xssClean());

// ROUTES
app.use("/api/v1/", pokedexRoute);

app.use(errors.errorHandler);

// Start server
const startServer = async () => {
  try {
    await mongoConnection();
    app.listen(port, () => {
      console.log(`Server is running on ${process.env.HOST}:${port}`);
      swaggerDocs(app, port);
      console.log(`OpenAPI Docs available at ${process.env.HOST}:${port}/docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

if (process.env.ENV !== "test") {
  startServer();
}

module.exports = app;
