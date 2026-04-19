"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kursus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kursus.belongsTo(models.User, {
        foreignKey: "mentor_id",
        as: "mentor",
      });

      Kursus.hasMany(models.Pendaftaran, {
        foreignKey: "kursus_id",
        as: "pendaftaran",
      });
    }
  }
  Kursus.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_kursus: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      mentor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },

      judul: {
        type: DataTypes.STRING,
      },

      deskripsi: {
        type: DataTypes.TEXT,
      },

      harga: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },

      status: {
        type: DataTypes.ENUM("online", "offline"),
        allowNull: false,
      },

      tgl_mulai: {
        type: DataTypes.DATE,
      },

      tgl_selesai: {
        type: DataTypes.DATE,
      },

      thumbnail: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Kursus",
      tableName: "kursus",
    },
  );
  return Kursus;
};
