const db = require("../interface/db/models/index.js");
const { Pendaftaran, Kursus, User } = db;

const tambahPendaftaran = async (body) => {
  return await Pendaftaran.create(body);
};

const lihatPendaftaran = async () => {
  return await Pendaftaran.findAll({
    include: [
      { model: User, as: "user" },
      { model: Kursus, as: "kursus" },
    ],
  });
};

const ubahPendaftaran = async (id, body) => {
  const data = await Pendaftaran.findByPk(id);
  if (!data) return null;

  await data.update(body);
  return data;
};

const hapusPendaftaran = async (id) => {
  return await Pendaftaran.destroy({ where: { id: id } });
};

const cariIdPendaftaran = async (id) => {
  return await Pendaftaran.findByPk(id,{
    include: [
      {model: User, as:"user", attributes:["nama_user", "email"]},
      {model: Kursus, as:"kursus", attributes:["nama_kursus", "harga"]}
    ]
  });
};
module.exports = {
  tambahPendaftaran,
  hapusPendaftaran,
  ubahPendaftaran,
  lihatPendaftaran,
  cariIdPendaftaran,
};
