    const express = require("express");
    require("dotenv").config();
    const path = require("path");

    const userRoute = require("../user/router.js");
    const kursusRoute = require("../kursus/router.js");
    const pendaftaranRoute = require("../pendaftaran/router.js");

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

    app.use("/api/users", userRoute);
    app.use("/api/kursus", kursusRoute);
    app.use("/api/pendaftaran", pendaftaranRoute);

    module.exports = app;