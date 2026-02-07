"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Karyawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Karyawan.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_karyawan: {
        type: DataTypes.STRING(50),
      },
      username: {
        type: DataTypes.STRING(20),
      },
      jabatan: {
        type: DataTypes.STRING(20),
      },
      alamat: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Karyawan",
      tableName: "karyawan",
    },
  );
  return Karyawan;
};
