const { Operasional, Data_akun } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");
const { Op } = require("sequelize");

// GET OPERASIONAL
exports.GetallOperasional= async (req, res) => {
   const { rows: allOp } = await Operasional.findAndCountAll({
     order: [["createdAt", "DESC"]],
   });
  res.render("admin/operasional/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allOp
  });
};

exports.GetaddOperasional = async (req, res) => {
  res.render("admin/operasional/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GeteditOperasional = async (req, res) => {
  const operasional_id = req.params.id;
  const data = await Operasional.findByPk(operasional_id);
  res.render("admin/operasional/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    data
  });
};

// CRUD SUPPLIER
exports.add_oper = async (req, res) => {
  let { kode, nama_oper, tgl_transaksi, debet, kredit, nama_pegawai } =
    req.body;

  try {
    const add = await Operasional.create({
      kode,
      nama_oper,
      tgl_transaksi,
      debet,
      kredit,
      nama_pegawai,
    });

    return res.redirect("/operasional")
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_oper = async (req, res) => {
  const operasional_id = req.params.id;
  let { kode, nama_oper, tgl_transaksi, debet, kredit, nama_pegawai } =
    req.body;

  try {
    const updated = await Operasional.update(
      {
        kode,
        nama_oper,
        tgl_transaksi,
        debet,
        kredit,
        nama_pegawai,
      },
      { where: { operasional_id } }
    );

    if (updated[0] === 1) {
      return res.redirect('/operasional')
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_Operasional = async (req, res) => {
  const operasional_id = req.params.id;

  try {
    const Delete = await Operasional.destroy({
      where: {
        operasional_id,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: Delete,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};
