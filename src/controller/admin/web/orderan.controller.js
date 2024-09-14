const { Orderan } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET TRANSAKSI
exports.GetallOrderan = async (req, res) => {
  const { rows: allOrder } = await Orderan.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("admin/order/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allOrder
  });
};

exports.GetaddOrderan = async (req, res) => {
  res.render("admin/order/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GeteditOrderan = async (req, res) => {
  const orderan_id = req.params.id;
  const data = await Orderan.findByPk(orderan_id);
  res.render("admin/order/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    data
  });
};

// CRUD Orderan
exports.add_Order = async (req, res) => {
  let {
    kode,
    tgl_terima,
    tgl_ambil,
    nama_pesanan,
    jenis_pesanan,
    qty,
    keterangan,
  } = req.body;

  try {
    const add = await Orderan.create({
      kode,
      tgl_terima,
      tgl_ambil,
      nama_pesanan,
      jenis_pesanan,
      qty,
      keterangan,
    });

    return res.redirect('/order')
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_order = async (req, res) => {
  const orderan_id = req.params.id;
  let {
    kode,
    tgl_terima,
    tgl_ambil,
    nama_pesanan,
    jenis_pesanan,
    qty,
    keterangan,
  } = req.body;

  try {
    const update = await Orderan.update(
      {
        kode,
        tgl_terima,
        tgl_ambil,
        nama_pesanan,
        jenis_pesanan,
        qty,
        keterangan,
      },
      { where: { orderan_id } }
    );

    if (update[0] === 1) {
      return res.redirect("/order")
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_Order = async (req, res) => {
  const orderan_id = req.params.id;

  try {
    const Delete = await Orderan.destroy({
      where: {
        orderan_id,
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
