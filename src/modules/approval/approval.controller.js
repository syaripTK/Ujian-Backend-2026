const {
  errorResponse,
  successResponse,
} = require("../../shared/utils/response.js");
const {
  create,
  update,
  drop,
  findByName,
  updateCuti,
  findApprovalId,
  findCutiId,
  findApprovalByCutiId,
  updateApproval,
} = require("./approval.service.js");

const cutiApprovement = async (req, res) => {
  try {
    const { cutiId, status, catatan } = req.body;
    const cuti = await findCutiId(cutiId);
    if (!cuti) {
      return errorResponse(res, 404, "Maaf, data cuti tidak ditemukan");
    }
    const isDuplicate = await findApprovalByCutiId(cutiId);
    if (isDuplicate) {
      return errorResponse(res, 403, "Maaf, data cuti sudah ada");
    }
    const body = { cutiId, userId: req.user.id, catatan };
    await create(body);
    await updateCuti(cutiId, { status });
    return successResponse(res, 201, "Data approval berhasil ditambahkan");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateApprovement = async (req, res) => {
  try {
    const { id } = req.params;
    const { cutiId, status, catatan } = req.body;
    const cuti = await findCutiId(cutiId);
    if (!cuti) {
      return errorResponse(res, 404, "Maaf, data cuti tidak ditemukan");
    }
    const approve = await findApprovalId(id);
    if (!approve) {
      return errorResponse(res, 404, "Maaf, data approval tidak ditemukan");
    }
    if (approve.dataValues.userId !== req.user.id) {
      return errorResponse(res, 403, "Maaf, akses ditolak");
    }
    if (cutiId != approve.dataValues.cutiId) {
      return errorResponse(res, 403, "Maaf, akses ditolak");
    }
    const body = { cutiId, catatan, updatedBy: req.user.id };
    await updateApproval(id, body);
    await updateCuti(cutiId, { status });
    return successResponse(res, 200, "Data approval berhasil diupdate");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const removeApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await findApprovalId(id);
    if (!data) {
      return errorResponse(res, 404, "Maaf, data approval tidak ditemukan");
    }
    if (data.userId != req.user.id) {
      return errorResponse(res, 403, "Maaf akses ditolak");
    }
    await drop(id);
    return successResponse(res, 200, "Data approval berhasil dihapus");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { cutiApprovement, updateApprovement, removeApproval };
