const {
  errorResponse,
  successResponse,
} = require("../../shared/utils/response.js");
const {
  create,
  findId,
  update,
  drop,
  findAll,
  search,
  findByName,
  dropCuti,
  dropApproval,
  dropKaryawan,
  deleteUser,
  findKaryawanUsn,
  updateKaryawan,
} = require("./user.service.js");
const path = require("path");
const fs = require("fs");
const {
  hashPassword,
  comparePassword,
} = require("../../shared/utils/helpers.js");

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return errorResponse(res, 400, "Body wajib diisi");
    }
    const { nama, username, email, password, role } = req.body;
    const hashed = await hashPassword(password);
    console.log(hashed);

    let profil = null;
    if (req.file) {
      profil = path.basename(req.file.path);
    }
    const body = { nama, username, email, password: hashed, role, profil };
    await create(body);
    return successResponse(res, 201, "User berhasil ditambahkan");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const seeAllUser = async (req, res) => {
  try {
    const users = await findAll();
    return successResponse(res, 200, "Data user", users);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findId(id);
    if (!user) {
      return errorResponse(res, 404, "Maaf, data user tidak ditemukan");
    }
    if (user.profil) {
      const filePath = path.join(__dirname, "../../uploads", user.profil);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await deleteUser(id);
    return successResponse(res, 200, "Data user berhasil dihapus");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const removeMe = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await findId(req.user.id);
    if (!user) {
      return errorResponse(res, 404, "Maaf, data user tidak ditemukan");
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 403, "Maaf, password salah");
    }
    if (user.profil) {
      const filePath = path.join(__dirname, "../../uploads", user.profil);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await deleteUser(req.user.id);
    return successResponse(res, 200, "Data user berhasil dihapus");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findId(id);
    if (!user) {
      return successResponse(res, 404, "Maaf, user tidak ditemukan");
    }
    let profil = user.profil;
    if (req.file) {
      if (user.profil) {
        const filePath = path.join(__dirname, "../../uploads", user.profil);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      profil = path.basename(req.file.path);
    }
    const { nama, username, password, role, email } = req.body;
    const hashed = await hashPassword(password);
    const body = { nama, username, email, password: hashed, role, profil };
    await update(id, body);
    return successResponse(res, 200, "Data user berhasil diupdate");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const searchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await search(id);
    if (!found) {
      return errorResponse(res, 404, "Data user tidak ditemukan");
    }
    return successResponse(res, 200, "Data user berhasil ditemukan", found);
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
        `Oopss.. user dengan username ${nama} tidak ditemukan`,
      );
    }
    return successResponse(res, 200, "Data user berhasil ditemukan", users);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const upgradeUser = async (req, res) => {
  try {
    const { nama, username, email } = req.body;
    const user = await findId(req.user.id);
    if (!user) {
      return successResponse(res, 404, "Maaf, user tidak ditemukan");
    }
    let profil = user.profil;
    if (req.file) {
      if (user.profil) {
        const filePath = path.join(__dirname, "../../uploads", user.profil);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      profil = path.basename(req.file.path);
    }
    const isKaryawan = await findKaryawanUsn(req.user.username);
    if (isKaryawan) {
      await updateKaryawan(req.user.username, username);
    }
    const body = { nama, username, email, profil };
    await update(req.user.id, body);
    return successResponse(res, 200, "Datamu berhasil diupgrade");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createUser,
  seeAllUser,
  removeUser,
  updateUser,
  searchUser,
  searchName,
  removeMe,
  upgradeUser,
};
