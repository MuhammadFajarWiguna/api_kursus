"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Kursus, {
        foreignKey: "mentor_id",
        as: "kursus",
      });
      User.hasMany(models.Pendaftaran, {
        foreignKey: "siswa_id",
        as: "pendaftaran",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_user: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull:false,
        unique: true,
        validate: {
          isEmail: true, 
        }
      },

      alamat: {
        type: DataTypes.TEXT,
      },

      no_hp: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
      },

      profile: {
        type: DataTypes.STRING,
        defaultValue: "default.png"
      },

      role: {
        type: DataTypes.ENUM("siswa", "mentor", "admin"),
        allowNull: false,
        defaultValue:"siswa",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
    },
  );
  return User;
};
