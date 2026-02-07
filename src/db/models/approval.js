"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Approval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Approval.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Approval.belongsTo(models.Cuti, {
        foreignKey: "cutiId",
        as: "cuti",
      });
    }
  }
  Approval.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      cutiId: {
        type: DataTypes.INTEGER,
      },
      catatan: {
        type: DataTypes.TEXT,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Approval",
      tableName: "approval",
    },
  );
  return Approval;
};
