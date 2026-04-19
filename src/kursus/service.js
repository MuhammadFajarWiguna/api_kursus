const { where } = require("sequelize");
const db = require("../interface/db/models/index.js");
const { Kursus, User } = db;

const buatKursus = async (data) => {
  return await Kursus.create(data);
};

const cariIdKursus = async (id) => {
  return await Kursus.findByPk(id);
};

const tampilKursus = async () => {
  return await Kursus.findAll({
    include: [
      { model: User, as: "mentor", attributes: ["id", "nama_user", "email"] },
    ],
  });
};

const cariKursusByMentor = async (mentor_id)=> {
  return await Kursus.findAll({
    where: {mentor_id},
    include: [
      {model: User, as: "mentor", attributes: ["id", "nama_user", "email"]},
    ],
  });
};

const ubahKursus = async (id, body) => {
  const data = await Kursus.findByPk(id);
  if (!data) return null;

  await data.update(body);
  return data;
};

const hapusKursus = async (id) => {
  return await Kursus.destroy({ where: { id } });
};
module.exports = {
  buatKursus,
  cariIdKursus,
  tampilKursus,
  ubahKursus,
  hapusKursus,
  cariKursusByMentor,
};
