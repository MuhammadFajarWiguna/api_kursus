const {
  buatKursus,
  cariIdKursus,
  tampilKursus,
  ubahKursus,
  hapusKursus,
  cariKursusByMentor,
} = require("./service.js");

const fs = require("fs");
const path = require("path");

const createKursus = async (req, res) => {
  let thumbnail = null;
  try {
    const {
      nama_kursus, 
      judul,
      deskripsi,
      harga,
      status,
      tgl_mulai,
      tgl_selesai,
    } = req.body;

    if (!nama_kursus || !status) {
      return res
        .status(400)
        .json({ message: "Nama kursus dan status wajib diisi" });
    }

    if (req.file) {
      thumbnail = req.file.filename;
    }

    const data = await buatKursus({
      nama_kursus,
      mentor_id:req.user.id,
      judul,
      deskripsi,
      harga,
      status,
      tgl_mulai,
      tgl_selesai,
      thumbnail,
    });
    return res.status(201).json({ message: "Kursus berhasil dibuat", data });
  } catch (error) {
    if (thumbnail) {
      const filePath = path.join(process.cwd(), "src/uploads", thumbnail);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return res.status(500).json({ message: error.message });
  }
};

const getKursus = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    let data;

    if (role === "admin") {
      data = await tampilKursus(); 

    } else if (role === "mentor")  { 
      data = await cariKursusByMentor(userId); 

    } else if(role === "siswa"){
      data = await tampilKursus()
    } else {
      return res.status(403).json({
        message: "Role tidak valid"
      })
    }

    return res.json({
      message: "Data kursus",
      data,
    });
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cariIdKursus(id);
    return res.status(200).json({ message: "Data kursus berdasar id", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateKursus = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      nama_kursus,
      judul,
      deskripsi,
      harga,
      status,
      tgl_mulai,
      tgl_selesai,
    } = req.body;

    const kursusLama = await cariIdKursus(id);
    if (!kursusLama) {
      return res.status(404).json({ message: "Kursus tidak ditemukan" });
    }

    let thumbnail = kursusLama.thumbnail;

    if (req.file) {
      thumbnail = req.file.filename;

      if (kursusLama.thumbnail) {
        const oldPath = path.join(
          __dirname,
          "../uploads",
          kursusLama.thumbnail,
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const body = {
      nama_kursus,
      mentor_id: req.user.id,
      judul,
      deskripsi,
      harga,
      status,
      tgl_mulai,
      tgl_selesai,
      thumbnail,
    };
    await ubahKursus(id, body);
    res.json({ message: "Kursus berhasil diupdate", data: body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteKursus = async (req, res) => {
  try {
    const id = req.params.id;

    const kursus = await cariIdKursus(id);
    if (!kursus) {
      return res.status(404).json({ message: "Kursus tidak ditemukan" });
    }

    if (kursus.thumbnail) {
      const filePath = path.join(
        process.cwd(),
        "/src/uploads",
        kursus.thumbnail,
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await hapusKursus(id);

    res.status(200).json({ message: "Kursus berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createKursus,
  getKursus,
  getById,
  updateKursus,
  deleteKursus,
};
