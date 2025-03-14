// src/middleware/requestLogger.js
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(
  __dirname,
  `../logs/${new Date()?.toISOString()?.split("T")[0]}-api.log`
); // Log file path based on the date

const requestLogger = (req, res, next) => {
  const startTime = process.hrtime(); // Start time

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const executionTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2); // Convert to milliseconds

    const logEntry = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    } - ${res.statusCode} - ${executionTime}ms\n`; // example format: [2025-03-14T11:31:06.137Z] GET /api/v1/pokedex - 200 - 28.52ms

    console.log(logEntry.trim()); // Log to console

    // Append log to file
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) console.error("Error writing log:", err);
    });
  });

  next();
};

module.exports = requestLogger;
