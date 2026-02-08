const { Karyawan } = require("../../db/models/index.js");

const create = async (body) => {
  return await Karyawan.create(body);
};

const findId = async (id) => {
  return await Karyawan.findByPk(id);
};

const getAll = async () => {
  return await Karyawan.findAll();
};

const remove = async (id) => {
  return await Karyawan.destroy({
    where: { id },
  });
};

const update = async (id, body) => {
  const user = await findId(id);
  await user.update(body);
  return user;
};



module.exports = { create, findId, getAll, remove, update };
