const express = require("express");
const router = express.Router();

const {
  createPendaftaran,
  getAllPendaftaran,
  deletePendaftaran,
  updatePendaftaran,
  getAllById,
} = require("./controller.js");

const { cekPendaftaran,cekId } = require("./validate.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { roleMiddleware } = require("../middlewares/role.js");

router.post("/tambah",authMiddleware,roleMiddleware(["siswa","admin"]), cekPendaftaran, createPendaftaran);
router.get("/data-pendaftar", authMiddleware, roleMiddleware(["admin"]), getAllPendaftaran);
router.get("/data/:id",authMiddleware,roleMiddleware(["admin"]), getAllById);
router.patch("/update/:id",authMiddleware,roleMiddleware(["siswa", "admin"]),cekId, cekPendaftaran, updatePendaftaran);
router.delete("/hapus/:id",authMiddleware,roleMiddleware(["admin", "siswa"]),cekId, deletePendaftaran);

module.exports = router;
