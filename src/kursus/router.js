  const express = require("express");
  const {
    createKursus,
    getById,
    updateKursus,
    deleteKursus,
    getKursus,
  } = require("./controller.js");

  const { cekId } = require("./validate.js");

  const { authMiddleware } = require("../middlewares/authMiddleware.js");
  const { roleMiddleware } = require("../middlewares/role.js");
  const uploadKursus = require("../multer/uploadKursus.js");

  const router = express.Router();

  router.get(
    "/",
    authMiddleware,
    roleMiddleware(["siswa", "admin", "mentor"]), 
    getKursus);

  router.get(
    "/cari/:id",
    authMiddleware,
    roleMiddleware(["mentor", "siswa", "admin"]),
    cekId,
    getById,
  );
  router.post(
    "/tambah",
    authMiddleware,
    roleMiddleware(["mentor", "admin"]),
    uploadKursus.single("thumbnail"),
    createKursus,
  );
  router.patch(
    "/ubah/:id",
    authMiddleware,
    roleMiddleware(["mentor", "admin"]),
    uploadKursus.single("thumbnail"),
    updateKursus,
  );
  router.delete(
    "/hapus/:id",
    authMiddleware,
    roleMiddleware(["mentor","admin"]),
    deleteKursus,
  );

  module.exports = router;
