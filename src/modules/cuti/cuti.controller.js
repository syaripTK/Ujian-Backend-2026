const { create, findId, update, drop } = require("./cuti.service.js");
const {
  errorResponse,
  successResponse,
} = require("../../shared/utils/response.js");

const addCuti = async (req, res) => {
  try {
    const { tgl_mulai, tgl_selesai, alasan } = req.body;
    const body = { tgl_mulai, tgl_selesai, alasan, userId: req.user.id };
    await create(body);
    return successResponse(res, 201, "Data cuti berhasil ditambahkan");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateCuti = async (req, res) => {
  try {
    const { id } = req.params;
    const cuti = await findId(id);
    if (!cuti) {
      return errorResponse(res, 404, "Maaf, data cuti tidak ditemukan");
    }
    if (cuti.userId !== req.user.id) {
      return errorResponse(res, 401, "Maaf akses ditolak");
    }
    await update(id, req.body);
    return successResponse(res, 200, `Data cuti id-(${id}) berhasil diubah`);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const removeCuti = async (req, res) => {
  try {
    const { id } = req.params;
    const cuti = await findId(id);
    if (!cuti) {
      return errorResponse(res, 404, "Maaf, data cuti tidak ditemukan");
    }
    if (cuti.userId !== req.user.id) {
      return errorResponse(res, 401, "Maaf akses ditolak");
    }
    await drop(id);
    return successResponse(res, 200, "Data cuti berhasil dihapus");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { addCuti, updateCuti, removeCuti };
