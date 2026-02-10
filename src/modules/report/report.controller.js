const {
  successResponse,
  errorResponse,
} = require("../../shared/utils/response.js");
const {
  getUserDashboard,
  getCutiByStatus,
  getCutiByApprover,
} = require("./report.sevice.js");

const detailUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserDashboard(id);
    if (data === false) {
      return errorResponse(res, 404, "Maaf, user tidak ditemukan");
    }
    if (data === null) {
      return errorResponse(
        res,
        401,
        `Maaf, data cuti dari user-id (${id}) tidak ditemukan`,
      );
    }
    return successResponse(res, 200, "Data cuti", data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const detailCutiByStatus = async (req, res) => {
  try {
    const { st } = req.params;
    const data = await getCutiByStatus(st);
    console.info(data);
    const total = data.length;
    return successResponse(res, 200, "Data status cuti", {
      total,
      detail: data,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getByIdApprover = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getCutiByApprover(id);
    if (data === null) {
        return successResponse(res, 404, "Maaf, belum ada")
    }
    return res.status(200).json(data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { detailUserById, detailCutiByStatus, getByIdApprover };
