const { Transaksipenjualan } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET TRANSAKSI Penjualan
exports.GetallTransaksi = async (req, res) => {
  const { rows: allTrans } = await Transaksipenjualan.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("admin/transaksi_penjualan/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allTrans
  });
};

exports.GetaddTransaksi = async (req, res) => {
  res.render("admin/transaksi_penjualan/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GeteditTransaksi = async (req, res) => {
   const penjualan_id = req.params.id;
   const data = await Transaksipenjualan.findByPk(penjualan_id);
  res.render("admin/transaksi_penjualan/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    data
  });
};

// CRUD Transaksi
exports.add_transaksi = async (req, res) => {
  let { nota, harga, nama_barang, qty,total_pembelian, total_bayar, kembali } = req.body;

  try {
    const add = await Transaksipenjualan.create({
      nota,
      harga,
      nama_barang,
      qty,
      total_pembelian,
      total_bayar,
      kembali,
    });

    return res.redirect("/transaksi_penjualan");
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_transaksi = async (req, res) => {
  const penjualan_id = req.params.id;
  let { nota, harga, nama_barang, qty, total_pembelian, total_bayar, kembali } =
    req.body;

  try {
    const update = await Transaksipenjualan.update(
      {
        nota,
        harga,
        nama_barang,
        qty,
        total_pembelian,
        total_bayar,
        kembali,
      },
      { where: { penjualan_id } }
    );

    if (update[0] === 1) {
      return res.redirect('/transaksi_penjualan')
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_transaksi = async (req, res) => {
  const penjualan_id = req.params.id;

  try {
    const Delete_transaksi = await Transaksipenjualan.destroy({
      where: {
        penjualan_id,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: Delete_transaksi,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};
