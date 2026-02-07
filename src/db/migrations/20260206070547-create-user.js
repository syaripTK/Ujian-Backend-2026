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
      nama: {
        type: Sequelize.STRING(100),
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM("admin", "user", "kabagppa", "kabagumum"),
        defaultValue: "user",
      },
      profil: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
