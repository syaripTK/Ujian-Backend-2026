const { Karyawan } = require("../../db/models/index.js");

const create = async (body) => {
  return await Karyawan.create(body);
};

module.exports = {create}