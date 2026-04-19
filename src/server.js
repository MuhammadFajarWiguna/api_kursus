// const express = require("express");
// require("dotenv").config();
// const path = require("path");

// const userRoute = require("./user/router.js");
// const kursusRoute = require("./kursus/router.js");
// const pendaftaranRoute = require("./pendaftaran/router.js");

// const app = express();
// const PORT = process.env.APP_PORT || 3000;
// const HOST = process.env.APP_HOST || "127.0.0.1";

// app.use(express.json());  
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/users", userRoute);
// app.use("/api/kursus", kursusRoute);
// app.use("/api/pendaftaran", pendaftaranRoute);

// app.listen(PORT, () => {
//   console.log(`Server berjalan di ${HOST}: ${PORT}`);
// });

// // const { sequelize } = require("../src/infrastructure/config/koneksi.js");
// // app.get("/", async (req, res) => {
// //   try {
// //     await sequelize.authenticate();
// //     return res
// //       .status(200)
// //       .json({ message: "Database berhasil terkoneksi cuy" });
// //   } catch (error) {
// //     return res.json({ message: error.message });
// //   }
// // });
