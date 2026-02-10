const { find } = require("lodash");
const {
  errorResponse,
  successResponse,
} = require("../../shared/utils/response");
const {
  create,
  findId,
  getAll,
  remove,
  update,
  findByName,
  findByUsn,
} = require("./karyawan.service.js");

const createKaryawan = async (req, res) => {
  try {
    await create(req.body);
    return successResponse(res, 201, "Data karyawan berhasil ditambahkan");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const spillKaryawan = async (req, res) => {
  try {
    const data = await getAll();
    return successResponse(res, 200, "Data karyawan", data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const karyawanResign = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findId(id);
    if (!user) {
      return errorResponse(
        res,
        404,
        `Oopss.. karyawan dengan id (${id}) tidak ditemukan`,
      );
    }
    await remove(id);
    return successResponse(res, 200, "Data karyawan berhasil dihapus");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const upgradeKaryawan = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findId(id);
    if (!user) {
      return errorResponse(
        res,
        404,
        `Oopss.. karyawan dengan id (${id}) tidak ditemukan`,
      );
    }
    await update(id, req.body);
    return successResponse(res, 200, "Data karyawan berhasil diupdate");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const searchName = async (req, res) => {
  try {
    const { nama } = req.query;
    const users = await findByName(nama);

    if (!users || users.length === 0) {
      return errorResponse(
        res,
        404,
        `Oopss.. karyawan dengan username ${nama} tidak ditemukan`,
      );
    }
    return successResponse(res, 200, "Data karyawan berhasil ditemukan", users);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const searchId = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await findId(id);
    if (!found) {
      return errorResponse(
        res,
        404,
        `Oopss.. karyawan dengan id (${id}) tidak ditemukan`,
      );
    }
    return successResponse(res, 200, "Data karyawan berhasil ditemukan", found);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getProfile = async (req, res) => {
  try {
    if (req.user.role == "user") {
      const data = await findByUsn(req.user.username);
      return res.status(200).json({ status: "success", data });
    }
    const karyawan = await getAll();
    return res.status(200).json({ status: "success", data: karyawan });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createKaryawan,
  spillKaryawan,
  karyawanResign,
  upgradeKaryawan,
  searchName,
  searchId,
  getProfile,
};
