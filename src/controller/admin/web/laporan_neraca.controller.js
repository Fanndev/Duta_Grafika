const {
  Barang,
  Customer,
  Jurnal,
  Operasional,
  Orderan,
  Pegawai,
  Supplier,
  Transaksipembelian,
} = require("../../../models");

// GET PAGE Laporan Neraca
exports.Getall = async (req, res) => {
  const { rows: allCustomer } = await Customer.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("admin/laporan_neraca/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allCustomer,
  });
};
