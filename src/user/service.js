const { where } = require("sequelize");
const db = require("../interface/db/models/index.js");
const { User } = db;

const buatUser = async (data) => {
  return await User.create(data);
};

const cariUser = async (email) => {
  return await User.findOne({ where: { email } });
};

const cariIdUser = async (id) => {
  return await User.findByPk(id,{
    attributes: { exclude: ["password"] },
  });

};

const tampilUser = async (role) => {
  const query = role ? {where: {role}} : {};
  return await User.findAll({
    ...query, 
    attributes: {exclude: ["password"]},
  });
}

const ubahUser = async (id, body) => {
  const data = await User.findByPk(id);
  if (!data) return null;

  await data.update(body);
  return data;
};

const hapusUser = async (id) => {
  return await User.destroy({ where: { id } });
};

const cariByRole = async (role) => {
  return await User.findAll({ where: { role } });
};
module.exports = {
  buatUser,
  cariUser,
  cariIdUser,
  tampilUser,
  ubahUser,
  hapusUser,
  cariByRole,
};
