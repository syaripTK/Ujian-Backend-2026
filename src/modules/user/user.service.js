const { User } = require("../../db/models/index.js");

const create = async (body) => {
  return await User.create(body);
};

const findId = async (id) => {
  return await User.findByPk(id);
};

const findUsn = async (username) => {
  return await User.findOne({
    where: { username },
  });
};

const look = async () => {
  return await User.findAll();
};

const update = async (id, body) => {
  const user = await getId(id);
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
  look,
  update,
  drop,
};

