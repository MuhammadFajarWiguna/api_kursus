"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_user: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      alamat: {
        type: Sequelize.TEXT,
      },

      no_hp: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },

      profile: {
        type: Sequelize.STRING,
        defaultValue: "default.png"
      },

      role: {
        type: Sequelize.ENUM("siswa", "mentor","admin"),
        allowNull: false,
        defaultValue:"siswa",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
