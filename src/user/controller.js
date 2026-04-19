const { buatUser, cariUser, cariIdUser, tampilUser, ubahUser, hapusUser, cariByRole } = require("./service.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");



const registerUser = async (req, res) => {
  try {
    const { nama_user, email, password, alamat, no_hp} = req.body;

    const cek = await cariUser(email);
    if (cek) {
      return res.status(400).json({message: "Email sudah digunakan"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await buatUser({
      nama_user,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      alamat,
      no_hp,
      role: "siswa",
      profile: "default.png",
    });

   return res.status(201).json({
      message: "Register berhasil",
      user: {
        id: user.id,
        nama_user: user.nama_user,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await cariUser(email);

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "password salah" });

    const token = jwt.sign(
      {
        id: user.id,
        nama_user: user.nama_user,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "Login sukses",
      data:{
        token,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nama_user,email, password,  alamat, no_hp, role } = req.body;
   
    const cek = await cariUser(email);

    if (cek) {
      return res.status(400).json({message: "Email sudah digunakan"})
    }

    const hashed = await bcrypt.hash(password, 10);

    const profile = req.file ? req.file.filename : "default.png";

    const user = await buatUser({
      nama_user,
      email: email.toLowerCase().trim(),
      password: hashed,
      alamat,
      no_hp,
      role,
      profile,
    });

    return res.status(201).json({
      message: "User berhasil didaftar",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMe = async(req, res) => {
  try {
    const user = await cariIdUser(req.user.id);
    return res.status(200).json({
    message: "Profil saya",
    data: user
  })
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const getByRole = async (req, res) => {
  try {
    const role = req.params.role;
    
    const allowedRole = [
      "admin",
      "mentor",
      "siswa",
    ]

if (!allowedRole.includes(role)) {
  return res.status(400).json({
    message: "Role tidak valid",
  });
}
    const data = await cariByRole(role);

    return res.status(200).json({ message: "Data berdasarkan role", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { nama_user, email, password } = req.body;

    const cek = await cariUser(email);
    if (cek) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await buatUser({
      nama_user,
      email: email.toLowerCase().trim(),
      password: hashed,
      role: "admin",
      profile: "default.png",
    });

    return res.status(201).json({
      message: "Admin berhasil dibuat",
      data: user,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getUsers = async (req, res) => {
  try {
    let data;
   
    if (req.user.role === "admin") {
      data = await tampilUser();
    } else if (req.user.role === "mentor") {
      data = await cariByRole("siswa");
    } else if (req.user.role === "siswa") {
      data = await cariByRole("mentor");
    }
    if (!data) {
  return res.status(403).json({ message: "Role tidak valid" });
    }

   return res.status(200).json({
      message: "Data user",
      data
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// const getUsers = async (req, res) => {
//   try {
//     const data = await tampilUser();

//     return res.status(200).json({
//       message: "Data User",
//       data,
//     })
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// const getSiswa = async (req, res) => {
//   try {
//     const data = await cariByRole("siswa")
//     return res.status(201).json({
//       message: "Data Siswa",
//       data
//     })
//   } catch (error) {
//     return res.status(500).json({message: error.message})
//   }
// }

// const getMentor = async (req, res) => {
//   try {
//     const data = await cariByRole("mentor")
//     return res.status(201).json({
//       message: "Data Mentor",
//       data,
//     })
//   } catch (error) {
//     return res.status(500).json({message: error.message})
//   }
// }

// const getAdmin = async (req, res) => {
//   try {
//     const data = await cariByRole("admin")
//     return res.status(201).json({
//       message: "Data Admin",
//       data,
//     })
//   } catch (error) {
//     return res.status(500).json({message: error.message})
//   }
// }
// const getAll = async (req, res) => {
//   try {
//     const data = await tampilUser();
//     return res.status(200).json({ message: "Data user", data });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getById = async (req, res) => {
  try {
    const data = await cariIdUser(req.params.id);
    if (!data) {
    return res.status(404).json({
        message: "User tidak ditemukan"
      })
    }
    return res.status(200).json({ message: "Detail user", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (
      req.user.role !== "admin" &&
      req.user.id != id
    ) {
      return res.status(403).json({
        message: "Maaf, Anda tidak punya akses",
      });
    }

    const userLama = await cariIdUser(id);
    if (!userLama) {
          return res.status(404).json({ message: "User tidak ditemukan" });
    }
    
    let profile = userLama.profile;

    if (req.file) {
      if (profile && profile !== "default.png") {
        const oldPath = path.join(__dirname, "../uploads", profile);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      profile = req.file.filename;
    }
    
    const { nama_user, email, alamat, no_hp } = req.body;

    await ubahUser(id, { nama_user, email, alamat, no_hp, profile });

    return res.json({ message: "User berhasil diubah" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await cariIdUser(id);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.profile && user.profile !== "default.png") {
      const filePath = path.join(__dirname, "../uploads", user.profile);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await hapusUser(id);

    return res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const mentorDashboard = (req, res) => {
//   const { id, nama_user, role } = req.user;
//   res.json({
//     message: "Welcome Mentor!",
//     user: {
//       id,
//       nama_user,
//       role,
//     },
//   });
// };

// const siswaDashboard = (req, res) => {
//   const { id, nama_user, role } = req.user;
//   res.json({
//     message: "Welcome Siswa!",
//     user: {
//       id,
//       nama_user,
//       role,
//     },
//   });
// };

// const adminDashboard = (req, res) => {
//   const { id, nama_user, role } = req.user;

//   res.json({
//     message: "Welcome Admin!",
//     user: {
//       id,
//       nama_user,
//       role,
//     },
//   });
// };

module.exports = {
  registerUser,
  loginUser,
  createAdmin,
  getUsers,
  getMe,
  getById,
  updateUser,
  deleteUser,
  getByRole,
  createUser,
};
