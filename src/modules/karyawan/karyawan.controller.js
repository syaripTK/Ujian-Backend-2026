const {
  errorResponse,
  successResponse,
} = require("../../shared/utils/response");
const { create } = require("./karyawan.service.js");

const createKaryawan = async (req, res) => {
  try {
    await create(req.body);
    return successResponse(res, 201, "Data karyawan berhasil ditambahkan");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { createKaryawan };
