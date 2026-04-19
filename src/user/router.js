const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getMe,
  getById,
  updateUser,
  deleteUser,
  getByRole,
  createUser,
  createAdmin,
} = require("./controller.js");

const { cekId, cekTambahUser, } = require("./validate.js");

const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { roleMiddleware } = require("../middlewares/role.js");
const uploadUser = require("../multer/uploadUser.js");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);

router.get(
  "/me",
  authMiddleware,
  getMe)

router.post(
  "/create-admin",
  authMiddleware,
  roleMiddleware(["admin"]),
  createAdmin
);

router.post(
  "/tambah", 
  authMiddleware,
  roleMiddleware(["admin"]), 
  uploadUser.single("profile"),
  cekTambahUser, 
  createUser);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["mentor","admin","siswa"]),
  getUsers,
);
router.get(
  "/role/:role",
  authMiddleware,
  roleMiddleware(["mentor", "admin"]),
  getByRole
);

// router.get(
//   "/admin",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   getUsers,
// );

// router.get(
//   "/data-admin",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   getByRole,
// );

router.get("/:id",
  authMiddleware,
  cekId,
  getById,
)

// router.get("/data-siswa", authMiddleware, roleMiddleware(["siswa", "admin", "mentor"]));
// router.get("/siswa", authMiddleware, roleMiddleware(["siswa", "admin", "mentor"]),getUsers);

router.patch(
  "/update/:id",
  authMiddleware,
  cekId,
  roleMiddleware(["admin", "siswa"]),
  uploadUser.single("profile"),
  updateUser,
);

router.delete(
  "/delete/:id",
  cekId,
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteUser,
);

module.exports = router;
