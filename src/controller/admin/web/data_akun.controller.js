const { Data_akun } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET PAGE Data Akun
exports.Getall = async (req, res) => {
    const { rows: allData } = await Data_akun.findAndCountAll({
      order: [["createdAt", "DESC"]],
    });
  res.render("admin/data_akun/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allData
  });
};

exports.GetpageAdd = async (req, res) => {
  res.render("admin/data_akun/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GetpageEdit = async (req, res) => {
  const data_id = req.params.id;
  const data = await Data_akun.findByPk(data_id);
  res.render("admin/data_akun/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    data
  });
};

// CRUD Data Akun
exports.add_dataAkun = async (req, res) => {
  let { kode, keterangan, debit, kredit } = req.body;

  try {
    const add = await Data_akun.create({
      kode,
      keterangan,
      debit,
      kredit
    });

    return res.redirect("/data_akun")
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_dataAkun = async (req, res) => {
  const data_id = req.params.id;
  let { kode, keterangan, debit, kredit } = req.body;

  try {
    const update = await Data_akun.update(
      {
        kode, keterangan, debit, kredit
      },
      { where: { data_id } }
    );

    if (update) {
    return res.redirect('/data_akun')
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_dataAkun = async (req, res) => {
  const data_id = req.params.id;

  try {
    const Delete = await Data_akun.destroy({
      where: {
        data_id,
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
