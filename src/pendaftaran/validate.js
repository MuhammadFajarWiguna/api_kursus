const { cariIdPendaftaran } = require("./service");

const cekPendaftaran = async (req, res, next) => {
  const { tanggal_daftar, kursus_id, status_pembayaran } = req.body;

  if (!tanggal_daftar || !kursus_id || !status_pembayaran) {
    return res.status(400).json({
      status: "error", 
      message: "Maaf, Tanggal daftar, Kursus ID, dan Status pembayaran harus diisi!",
    });
  }
  next();
};

const cekId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await cariIdPendaftaran(id);

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    req.dataPendaftaran = data;

    next(); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {cekPendaftaran,cekId}