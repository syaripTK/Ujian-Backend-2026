const { Op } = require("sequelize");
const { Approval, Cuti } = require("../../db/models/index.js");

const create = async (body) => {
  return await Approval.create(body);
};

const findApprovalId = async (id) => {
  return await Approval.findByPk(id);
};

const findCutiId = async (id) => {
  return await Cuti.findByPk(id);
};

const findByName = async (keyword) => {
  return await Approval.findAll({
    where: {
      username: { [Op.like]: `%${keyword}%` },
    },
  });
};

const update = async (id, body) => {
  const data = await findApprovalId(id);
  await data.update(body);
  return data;
};

const updateCuti = async (id, body, transaction) => {
  return await Cuti.update(body, {
    where: { id },
    transaction,
  });
};

const updateApproval = async (id, body, transaction) => {
  return await Approval.update(body, {
    where: { id },
    transaction,
  });
};

const drop = async (id) => {
  return await Approval.destroy({
    where: { id },
  });
};

const findApprovalByCutiId = async (cutiId) => {
  return await Approval.findOne({
    where: { cutiId },
  });
};

module.exports = {
  create,
  findApprovalId,
  findCutiId,
  update,
  drop,
  findByName,
  updateCuti,
  findApprovalByCutiId,
  updateApproval,
};
