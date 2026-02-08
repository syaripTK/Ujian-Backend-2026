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
  updateKaryawan,
} = require("./auth.service.js");
const {
  generateToken,
  hashPassword,
  comparePassword,
} = require("../../shared/utils/helpers.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    if (!req.body) {
      return errorResponse(res, 400, "Body wajib diisi");
    }
    const { nama, username, email, password } = req.body;
    const hashed = await hashPassword(password);
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

const changePassword = async (req, res) => {
  try {
    const { password_baru } = req.body;
    const hashed = await hashPassword(password_baru);
    const body = { password: hashed };
    await update(req.user.id, body);
    return successResponse(res, 200, "Password berhasil diubah");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const changeUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await findId(req.user.id);
    await update(req.user.id, { username });
    await updateKaryawan(user.username, { username });
    return successResponse(res, 200, "Username berhasil diupdate");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  register,
  login,
  changePassword,
  changeUsername,
};
