"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cuti", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tgl_mulai: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tgl_selesai: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      alasan: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM("pending", "disetujui", "ditolak"),
        defaultValue: "pending",
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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
    await queryInterface.dropTable("cuti");
  },
};
