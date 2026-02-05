const { cariIdPendaftaran } = require("./service");

const cekPendaftaran = async (req, res, next) => {
  const { tanggal_daftar, siswa_id, kursusId, status_pembayaran } =
    req.body || {};
  if (!tanggal_daftar || !siswa_id || !kursusId || !status_pembayaran) {
    return res.status(400).json({
      Status: "error",
      message: "Maaf, Tanggal daftar, Status pembayaran harus di isi..!!",
    });
  }
  next();
};

const cekId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await cariIdPendaftaran(id);
    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" }, null);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  next();
};

module.exports = { cekPendaftaran,cekId };
