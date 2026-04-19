"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pendaftaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pendaftaran.belongsTo(models.User, {
        foreignKey: "siswa_id",
        as: "user",
      });
      Pendaftaran.belongsTo(models.Kursus, {
        foreignKey: "kursus_id",
        as: "kursus",
      });
    }
  }
  Pendaftaran.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tanggal_daftar: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },

      siswa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },

      kursus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "kursus",
          key: "id",
        },
      },

      status_pembayaran: {
        type: DataTypes.ENUM("pending", "lunas", "cicil"),
        allowNull: false,
        defaultValue:"pending"
      },
    },
    {
      sequelize,
      modelName: "Pendaftaran",
      tableName: "pendaftaran",
    },
  );
  return Pendaftaran;
};
