const {
  Barang,
  Customer,
  Jurnal,
  Operasional,
  Orderan,
  Pegawai,
  Supplier,
  Transaksipembelian
} = require("../../../models")


 const DashboardPage = async (req, res) => {
  const total_Order = (await Orderan.findAndCountAll()).count;
  const total_Customer = (await Customer.findAndCountAll()).count;
  const total_Operasional = (await Operasional.findAndCountAll()).count;
  const total_Pegawai = (await Pegawai.findAndCountAll()).count;
  const total_supplier = (await Supplier.findAndCountAll()).count;
  const total_Barang = (await Barang.findAndCountAll()).count;
  const total_Transaksi = (await Transaksipembelian.findAndCountAll()).count;
  res.render("admin/dashboard", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    data : {
      total_Barang,
      total_Operasional,
      total_Pegawai,
      total_Transaksi,
      total_Customer,
      total_Order,
      total_supplier
    }
  });
};

module.exports = {
    DashboardPage
}