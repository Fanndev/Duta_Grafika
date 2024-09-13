const { Pegawai } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET PAGE PEGAWAI
exports.GetallPegawai = async (req, res) => {
  res.render("admin/pegawai/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GetpageAdd = async (req, res) => {
  res.render("admin/pegawai/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GetpageAdd = async (req, res) => {
  res.render("admin/pegawai/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

// CRUD PEGAWAI
exports.add_Pegawai = async (req, res) => {
  let { kode, nama_pegawai, telepon, alamat, is_aktif } = req.body;

  // Konversi is_aktif menjadi boolean jika diperlukan
  is_aktif = is_aktif === "true" || is_aktif === true ? true : false;

  try {
    const addPegawai = await Pegawai.create({
      kode,
      nama_pegawai,
      telepon,
      alamat,
      is_aktif,
    });

    return res.status(StatusCode.CREATED).json({
      message: ResponseMessage.Added,
      data: addPegawai,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_Pegawai = async (req, res) => {
  const pegawai_id = req.params.id;
  let { kode, nama_pegawai, telepon, alamat, is_aktif } = req.body;

  // Konversi is_aktif menjadi boolean jika diperlukan
  is_aktif = is_aktif === "true" || is_aktif === true ? true : false;

  try {
    const pegawai = await Pegawai.findByPk(pegawai_id);
    if (!pegawai) {
      return res.status(StatusCode.NOT_FOUND).json({
        message: ResponseMessage.NotFound,
      });
    }

    // Update data supplier
    const updatePegawai = await Pegawai.update(
      {
        kode,
        nama_pegawai,
        telepon,
        alamat,
        is_aktif,
      },
      { where: { pegawai_id } }
    );

    if (updatePegawai[0] === 1) {
      return res.status(StatusCode.OK).json({
        message: ResponseMessage.Updated,
        data: await Pegawai.findByPk(pegawai_id), // Mengembalikan data terbaru setelah update
      });
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: ResponseMessage.FailUpdated,
      });
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_Pegawai = async (req, res) => {
  const pegawai_id = req.params.id;

  try {
    const Delete_Pegawai = await Pegawai.destroy({
      where: {
        pegawai_id,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: Delete_Pegawai,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};
