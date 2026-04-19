const { cariUser, cariIdUser } = require("./service");
const bcrypt = require("bcryptjs");

const cekId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await cariIdUser(id);
    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const cekTambahUser = async (req, res, next) => {
  const { nama_user, password, email, alamat, no_hp, role } = req.body;

  if (!nama_user || !password || !email || !alamat || !no_hp || !role) {
    return res.status(400).json({
      message: "nama user, password, email, alamat, no_hp, role wajib diisi!",
    });
  }
  const maxVarchar = 15;

  if (no_hp.length > maxVarchar) {
    return res.status(400).json({ message: `No hp tidak boleh lebih dari ${maxVarchar} karakter` });
  }
  next();
};

const cekLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    const user = await cariUser(email);
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const hashing = await bcrypt.compare(password, user.password);
    if (!hashing) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { cekId, cekTambahUser, cekLogin };
