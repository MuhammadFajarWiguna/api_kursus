"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    return queryInterface.bulkInsert("user", [
      {
        nama_user: "admin12",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
        alamat: "Bandung",
        no_hp: "08123456789",
        profile: "default.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user", {
      email: "admin@gmail.com",
    });
  },
};