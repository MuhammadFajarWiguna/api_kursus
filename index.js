const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API online gratis di Vercel"
  });
});

module.exports = app;