const { Transaksi } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET TRANSAKSI
exports.GetallTransaksi = async (req, res) => {
  const { rows: allTrans } = await Transaksi.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("admin/transaksi/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allTrans
  });
};

exports.GetaddTransaksi = async (req, res) => {
  res.render("admin/transaksi/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GeteditTransaksi = async (req, res) => {
   const transaksi_id = req.params.id;
   const data = await Transaksi.findByPk(transaksi_id);
  res.render("admin/transaksi/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    data
  });
};

// CRUD Transaksi
exports.add_transaksi = async (req, res) => {
  let { kode, nama_barang, tgl_pembelian, total_order, harga_barang, is_aktif } = req.body;

  // Konversi is_aktif menjadi boolean jika diperlukan
  is_aktif = is_aktif === "true" || is_aktif === true ? true : false;

  try {
    const add = await Transaksi.create({
      kode,
      nama_barang,
      tgl_pembelian,
      total_order,
      harga_barang,
      is_aktif,
    });

    return res.redirect("/transaksi")
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_transaksi = async (req, res) => {
  const transaksi_id = req.params.id;
  let {
    kode,
    nama_barang,
    tgl_pembelian,
    total_order,
    harga_barang,
    is_aktif,
  } = req.body;

  // Konversi is_aktif menjadi boolean jika diperlukan
  is_aktif = is_aktif === "true" || is_aktif === true ? true : false;

  try {
    const update = await Transaksi.update(
      {
        kode,
        nama_barang,
        tgl_pembelian,
        total_order,
        harga_barang,
        is_aktif,
      },
      { where: { transaksi_id } }
    );

    if (update[0] === 1) {
      return res.redirect('/transaksi')
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_transaksi = async (req, res) => {
  const supplier_id = req.params.id;

  try {
    const Delete_Supplier = await Supplier.destroy({
      where: {
        supplier_id,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: Delete_Supplier,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};
