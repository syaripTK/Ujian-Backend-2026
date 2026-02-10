const {
  create,
  findId,
  update,
  drop,
  findByUserId,
} = require("./cuti.service.js");
const {
  errorResponse,
  successResponse,
} = require("../../shared/utils/response.js");
const { hitungHariCuti } = require("../../shared/utils/helpers.js");

const addCuti = async (req, res) => {
  try {
    const { tgl_mulai, tgl_selesai, alasan } = req.body;
    const body = { tgl_mulai, tgl_selesai, alasan, userId: req.user.id };
    const days = hitungHariCuti(tgl_mulai, tgl_selesai);
    const cutiTahunan = 12;
    if (days > cutiTahunan) {
      return successResponse(res, 401, "Pengajuan cuti maksimal 12 hari");
    }
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

const sisaCuti = async (req, res) => {
  try {
    const cutiTahunan = 12;
    const cuti = await findByUserId(req.user.id);
    if (cuti.length === 0) {
      return res.status(200).json({
        message: "Anda belum mengambil cuti tahun ini, silahkan ambil cuti",
      });
    }
    const totalDipakai = cuti.reduce((total, cuti) => {
      return cuti.status === "disetujui"
        ? total + hitungHariCuti(cuti.tgl_mulai, cuti.tgl_selesai)
        : total;
    }, 0);

    if (totalDipakai >= cutiTahunan) {
      return res.status(200).json({
        message: "Jatah cuti anda tahun ini telah habis",
      });
    }
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { addCuti, updateCuti, removeCuti, sisaCuti };
