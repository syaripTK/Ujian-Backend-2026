"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require("bcrypt");
    const hashed = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert(
      "user",
      [
        {
          id: 1,
          nama: "administrator",
          username: "admin",
          email: "admin@gmail.com",
          password: hashed,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
  },
};
