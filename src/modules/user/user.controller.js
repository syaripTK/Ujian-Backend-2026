const {
  errorResponse,
  successResponse,
  loginResponse,
} = require("../../shared/utils/response.js");
const {
  create,
  findId,
  findUsn,
  update,
  drop,
  findAll,
} = require("./user.service.js");
const { generateToken, hashPassword, comparePassword } = require("./auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const register = async (req, res) => {
  try {
    if (!req.body) {
      return errorResponse(res, 400, "Body wajib diisi");
    }
    const { nama, username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const body = { nama, username, email, password: hashed };
    await create(body);
    return successResponse(res, 201, "User berhasil dibuat");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const login = async (req, res) => {
  try {
    if (!req.body) {
      return errorResponse(res, 400, "Body wajib diisi");
    }
    const { username, password } = req.body;
    const user = await findUsn(username);
    if (!user) {
      return errorResponse(res, 404, "Maaf username tidak ditemukan");
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 401, "Maaf, password salah");
    }
    const token = generateToken(user);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return loginResponse(res, 200, "Login berhasil", token, {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

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
    await drop(id);
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
      const filePath = path.join(__dirname, "../uploads", user.profil);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      profil = path.basename(req.file.path);
    }
    const { nama, username, email, password, role } = req.body;
    const body = { nama, username, email, password, role, profil };
    await update(body);
    return successResponse(res, 200, "Data user berhasil diupdate");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await findId(req.user.id);
    const { password_lama, password_baru } = req.body;
    const hashed = await hashPassword(password_baru);
    const body = { password: hashed };
    await update(req.user.id, body);
    return successResponse(res, 200, "Password berhasil diubah");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  register,
  login,
  createUser,
  seeAllUser,
  removeUser,
  updateUser,
  changePassword
};
