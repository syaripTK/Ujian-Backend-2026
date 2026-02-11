const { Op } = require("sequelize");
const {
  User,
  Cuti,
  Approval,
  Karyawan,
  sequelize,
} = require("../../db/models/index.js");

const create = async (body) => {
  return await User.create(body);
};

const findAll = async () => {
  return await User.findAll({
    attributes: {
      exclude: ["password", "profil", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Cuti,
        as: "cuti",
        attributes: ["id", "alasan", "status"],
      },
    ],
  });
};

const findId = async (id) => {
  return await User.findByPk(id);
};

const search = async (id) => {
  return await User.findByPk(id, {
    attributes: {
      exclude: ["password", "profil", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Cuti,
        as: "cuti",
        attributes: ["id", "alasan", "status"],
      },
    ],
  });
};

const findUsn = async (username) => {
  return await User.findOne({
    where: { username },
  });
};

const findKaryawanUsn = async (username) => {
  return await Karyawan.findOne({
    where: { username },
  });
};

const findByName = async (keyword) => {
  return await User.findAll({
    where: {
      username: { [Op.like]: `%${keyword}%` },
    },
    attributes: {
      exclude: ["password"],
    },
  });
};

const dropCuti = async (userId) => {
  return await Cuti.destroy({
    where: { userId },
  });
};

const dropApproval = async (userId) => {
  return await Approval.destroy({
    where: { userId },
  });
};

const updateKaryawan = async (username, body) => {
  return await Karyawan.update(body, {
    where: { username },
  });
};

const dropKaryawan = async (username) => {
  return await Karyawan.destroy({
    where: { username },
  });
};

const update = async (id, body) => {
  const user = await findId(id);
  await user.update(body);
  return user;
};

const drop = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

const deleteUser = async (userId) => {
  return sequelize.transaction(async (t) => {
    const cutiList = await Cuti.findAll({
      where: { userId },
      attributes: ["id"],
      raw: true,
      transaction: t,
    });

    const cutiId = cutiList.map((c) => c.id);

    if (cutiId.length > 0) {
      await Approval.destroy({
        where: { cutiId: { [Op.in]: cutiId } },
        transaction: t,
      });
    }

    await Cuti.destroy({ where: { userId }, transaction: t });
    await User.destroy({ where: { id: userId }, transaction: t });

    return true;
  });
};

module.exports = {
  create,
  findId,
  findUsn,
  update,
  drop,
  findAll,
  search,
  findByName,
  dropApproval,
  dropCuti,
  dropKaryawan,
  deleteUser,
  findKaryawanUsn,
  updateKaryawan,
};
