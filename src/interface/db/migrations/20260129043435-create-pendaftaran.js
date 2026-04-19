"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pendaftaran", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tanggal_daftar: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },

      siswa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },

      kursus_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "kursus",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },

      status_pembayaran: {
        type: Sequelize.ENUM("pending", "lunas", "cicil"),
        allowNull: false,
        defaultValue: "pending"
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
    await queryInterface.addConstraint("pendaftaran",{
      fields:["siswa_id", "kursusId"],
      type:"unique",
      name:"unique_siswa_kursus"
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pendaftaran");
  },
};
