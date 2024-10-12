const { Transaksipembelian, Data_akun } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET TRANSAKSI Pembelian
exports.GetallTransaksi = async (req, res) => {
  const { rows: allTrans } = await Transaksipembelian.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("admin/transaksi_pembelian/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allTrans
  });
};

exports.GetaddTransaksi = async (req, res) => {
  const ListAkun = await Data_akun.findAll()
  res.render("admin/transaksi_pembelian/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    ListAkun
  });
};

exports.GeteditTransaksi = async (req, res) => {
   const pembelian_id = req.params.id;
   const ListAkun = await Data_akun.findAll()
   const data = await Transaksipembelian.findByPk(pembelian_id);
  res.render("admin/transaksi_pembelian/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    data,
    ListAkun
  });
};

// CRUD Transaksi
exports.add_transaksi = async (req, res) => {
  let { nota, nama_barang, harga, tanggal, nama_supplier, total_pembelian, total_bayar, qty } = req.body;

  try {
    const add = await Transaksipembelian.create({
      nota,
      nama_barang,
      tanggal,
      harga,
      nama_supplier,
      total_pembelian,
      total_bayar,
      qty,
    });

    return res.redirect("/transaksi_pembelian");
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_transaksi = async (req, res) => {
  const pembelian_id = req.params.id;
  let {
    nota,
    nama_barang,
    harga,
    tanggal,
    nama_supplier,
    total_pembelian,
    total_bayar,
    qty,
  } = req.body;

  try {
    const update = await Transaksipembelian.update(
      {
        nota,
        nama_barang,
        harga,
        tanggal,
        nama_supplier,
        total_pembelian,
        total_bayar,
        qty,
      },
      { where: { pembelian_id } }
    );

    if (update[0] === 1) {
      return res.redirect('/transaksi_pembelian')
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_transaksi = async (req, res) => {
  const pembelian_id = req.params.id;

  try {
    const Delete_transaksi = await Transaksipembelian.destroy({
      where: {
        pembelian_id,
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
