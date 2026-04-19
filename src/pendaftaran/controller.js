const { tambahPendaftaran, hapusPendaftaran, ubahPendaftaran, lihatPendaftaran, cariIdPendaftaran } = require("./service.js");

const createPendaftaran = async (req, res) => {
  try {
    const { tanggal_daftar, kursus_id, status_pembayaran } = req.body;

    const body = {
      tanggal_daftar,
      siswa_id: req.user.id,
      kursus_id,
      status_pembayaran,
    };

    const data = await tambahPendaftaran(body);
    return res.status(200).json({ message: "Data berhasil ditambahkan", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllPendaftaran = async (req, res) => {
  try {
    const data = await lihatPendaftaran();

    return res.json({
      message: "Data Pendaftar",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePendaftaran = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cariIdPendaftaran(id);
    if (!data) {
      return res.status(404).json({ message: "Maaf, Data tidak ditemukan" });
    }

    if (req.user.role !== "admin" && data.siswa_id !== req.user.id) {
      return res.status(403).json({ message: "Maaf, Anda tidak punya akses" });
    }
    await hapusPendaftaran(id);
    return res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cariIdPendaftaran(id);
    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    if (req.user.role !== "admin" && data.siswa_id !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }
    return res.status(201).json({ message: "Data pendaftaran berdasarkan id", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePendaftaran = async (req, res) => {
  try {
    const id = req.params.id;
    const dataLama = await cariIdPendaftaran(id);
    if (!dataLama) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    if (req.user.role !== "admin" && dataLama.siswa_id !== req.user.id) {
      return res.status(403).json({ message: "Maaf, Anda tidak punya akses " });
    }
    const { tanggal_daftar, kursus_id, status_pembayaran } = req.body;
    const body = {
      tanggal_daftar,
      siswa_id: dataLama.siswa_id,
      kursus_id,
      status_pembayaran,
    };

    const data = await ubahPendaftaran(id, body);
    return res.status(200).json({ message: "Data berhasil diubah", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createPendaftaran,
  getAllPendaftaran,
  deletePendaftaran,
  updatePendaftaran,
  getAllById,
};
