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
      // define association here
      User.hasMany(models.Cuti, {
        foreignKey: "userId",
        as: "cuti",
      });
      User.hasMany(models.Approval, {
        foreignKey: "userId",
        as: "approval",
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
      nama: {
        type: DataTypes.STRING(100),
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "kabagppa", "kabagumum"),
        defaultValue: "user",
      },
      profil: {
        type: DataTypes.STRING,
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
