const {
  errorResponse,
  successResponse,
  loginResponse,
} = require("../../shared/utils/response.js");
const {
  create,
  findId,
  findUsn,
  look,
  update,
  drop,
} = require("./user.service.js");
const { generateToken, hashPassword, comparePassword } = require("./auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      return errorResponse(res, 400, "Body wajib diisi")
    }
    const {username, password} = req.body
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

module.exports = { register, login };
