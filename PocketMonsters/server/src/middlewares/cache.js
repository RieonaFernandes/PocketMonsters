const cacheMiddleware = (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=86400"); // 1 day
  next();
};

module.exports = { cacheMiddleware };
