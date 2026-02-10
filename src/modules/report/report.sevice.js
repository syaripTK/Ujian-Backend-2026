const { Cuti, User, Approval } = require("../../db/models/index.js");
const _ = require("lodash");

const getUserDashboard = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ["id"],
    include: [
      {
        model: Cuti,
        as: "cuti",
        attributes: ["id", "tgl_mulai", "tgl_selesai", "alasan", "status"],
      },
    ],
  });

  if (!user) return false;
  const plainUser = user.get({ plain: true });
  if (plainUser.cuti.length === 0) return null;
  const cutiList = plainUser.cuti;
  const total_cuti = cutiList.length;
  const countByStatus = _.countBy(cutiList, "status");
  return {
    id: String(plainUser.id),
    total_cuti,
    total_disetujui: countByStatus.disetujui || 0,
    total_ditolak: countByStatus.ditolak || 0,
    total_pending: countByStatus.pending || 0,
    detail: cutiList,
  };
};

const getCutiByStatus = async (status) => {
  const cuti = await Cuti.findAll({
    where: { status },
    attributes: ["tgl_mulai", "tgl_selesai", "alasan", "status"],
    raw: true,
  });

  return cuti;
};

const getCutiByApprover = async (userId) => {
  const approvals = await Approval.findAll({
    where: { userId },
    attributes: ["id", "catatan"],
    include: [
      {
        model: Cuti,
        as: "cuti",
        attributes: ["id", "tgl_mulai", "tgl_selesai", "alasan", "status"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "nama"],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });
  const kabag = await User.findByPk(userId);

  if (!approvals.length) return null;

  const cutiList = approvals.map((a) => a.cuti);
  const countByStatus = _.countBy(cutiList, "status");

  const detail = approvals.map((a) => ({
    id: a.id,
    catatan: a.catatan,
    user: {
      id: kabag.id,
      nama: kabag.nama,
    },
    cuti: a.cuti,
  }));

  return {
    kabagId: userId,
    total_approval: approvals.length,
    total_disetujui: countByStatus.disetujui || 0,
    total_ditolak: countByStatus.ditolak || 0,
    total_pending: countByStatus.pending || 0,
    detail,
  };
};

module.exports = { getUserDashboard, getCutiByStatus, getCutiByApprover };
