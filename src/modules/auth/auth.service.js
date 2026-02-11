const { User, Cuti, Karyawan } = require("../../db/models/index.js");

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

const findUsn = async (username) => {
  return await User.findOne({
    where: { username },
  });
};

const update = async (id, body) => {
  const user = await findId(id);
  await user.update(body);
  return user;
};

const updateKaryawan = async (username, body) => {
  const user = await Karyawan.findOne({
    where: { username },
  });
  await user.update(body);
  return user;
};

const drop = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  findId,
  findUsn,
  update,
  drop,
  findAll,
  updateKaryawan,
};
