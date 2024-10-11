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

// GET PAGE Laporan Buku
exports.Getall = async (req, res) => {
  const { rows: allCustomer } = await Customer.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("admin/laporan_buku/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allCustomer,
  });
};
