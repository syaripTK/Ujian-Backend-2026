const { Op } = require("sequelize");
const { Cuti } = require("../../db/models/index.js");

const create = async (body) => {
  return await Cuti.create(body);
};

const findId = async (id) => {
  return await Cuti.findByPk(id);
};

const findByName = async (keyword) => {
  return await Cuti.findAll({
    where: {
      username: { [Op.like]: `%${keyword}%` },
    },
  });
};

const update = async (id, body) => {
  const data = await findId(id);
  await data.update(body);
  return data;
};

const drop = async (id) => {
  return await Cuti.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  findId,
  update,
  drop,
  findByName,
};
