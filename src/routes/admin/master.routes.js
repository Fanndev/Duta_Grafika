const barangController = require("../../controller/admin/web/barang.controller");
const supplierController = require("../../controller/admin/web/supplier.controller");
const pegawaiController = require("../../controller/admin/web/pegawai.controller");
const customerController = require("../../controller/admin/web/customer.controller");
const transaksiController = require("../../controller/admin/web/transaksiPembelian.controller");
const transaksiPenjualanController = require("../../controller/admin/web/transaksiPenjualan.controller");
const orderController = require("../../controller/admin/web/orderan.controller");
const operasionalController = require("../../controller/admin/web/operasional.controller")
const { ensureLoggedIn } = require("connect-ensure-login");
const login = ensureLoggedIn({ redirectTo: "/auth/login" });
module.exports = (express, app, default_router) => {
  const router = express.Router();

  // pegawai
  router.get("/pegawai", login, pegawaiController.GetallPegawai); // pegawai
  router.get("/pegawai/add", login, pegawaiController.GetpageAdd); // pegawai
  router.get("/pegawai/edit/:id", login, pegawaiController.GetpageEdit); // pegawai
  router.post("/pegawai", login, pegawaiController.add_Pegawai); // pegawai
  router.post("/pegawai/:id", login, pegawaiController.update_Pegawai); // pegawai
  router.delete("/pegawai/:id", login, pegawaiController.Delete_Pegawai); // pegawai

  // Supplier
  router.get("/supplier", login, supplierController.GetallSupplier); // supplier
  router.get("/supplier/add", login, supplierController.GetaddSupplier); // supplier
  router.get("/supplier/edit/:id", login, supplierController.GeteditSupplier); // supplier
  router.post("/supplier", login, supplierController.add_Suplier); // supplier
  router.post("/supplier/:id", login, supplierController.update_Supplier); // supplier
  router.delete("/supplier/:id", login, supplierController.Delete_Supplier); // supplier

  // Barang
  router.get("/barang", login, barangController.GetallBarang); // barang
  router.get("/barang/add", login, barangController.GetBarangaddPage); // barang
  router.get("/barang/edit/:id", login, barangController.GetBarangeditPage); // barang
  router.post("/barang", login, barangController.add_Barang); // barang
  router.post("/barang/:id", login, barangController.update_Barang); // barang
  router.delete("/barang/:id", login, barangController.Delete_Barang); // barang

  // Customer
  router.get("/customer", login, customerController.GetallCustomer); // Customer
  router.get("/customer/add", login, customerController.GetpageAdd); // Customer
  router.get("/customer/edit/:id", login, customerController.GetpageEdit); // Customer
  router.post("/customer", login, customerController.add_customer); // customer
  router.post("/customer/:id", login, customerController.update_Customer); // customer
  router.delete("/customer/:id", login, customerController.Delete_Customer); // customer

  // Transaksi PEMBELIAN
  router.get("/transaksi_pembelian", login, transaksiController.GetallTransaksi); // Transaksi
  router.get("/transaksi_pembelian/add", login, transaksiController.GetaddTransaksi); // Transaksi
  router.get("/transaksi_pembelian/edit/:id", login, transaksiController.GeteditTransaksi); // Transaksi
  router.post("/transaksi_pembelian", login, transaksiController.add_transaksi); // transaksi
  router.post("/transaksi_pembelian/:id", login, transaksiController.update_transaksi); // transaksi
  router.delete("/transaksi_pembelian/:id", login, transaksiController.Delete_transaksi); // transaksi

  // Transaksi PENJUALAN
  router.get("/transaksi_penjualan", login, transaksiPenjualanController.GetallTransaksi); // Transaksi
  router.get("/transaksi_penjualan/add", login, transaksiPenjualanController.GetaddTransaksi); // Transaksi
  router.get("/transaksi_penjualan/edit/:id", login, transaksiPenjualanController.GeteditTransaksi); // Transaksi
  router.post("/transaksi_penjualan", login, transaksiPenjualanController.add_transaksi); // transaksi
  router.post("/transaksi_penjualan/:id", login, transaksiPenjualanController.update_transaksi); // transaksi
  router.delete("/transaksi_penjualan/:id", login, transaksiPenjualanController.Delete_transaksi); // transaksi

  // Order
  router.get("/order", login, orderController.GetallOrderan); // Order
  router.get("/order/add", login, orderController.GetaddOrderan); // Order
  router.get("/order/edit/:id", login, orderController.GeteditOrderan); // Order
  router.post("/order", login, orderController.add_Order); // order
  router.post("/order/:id", login, orderController.update_order); // order
  router.delete("/order/:id", login, orderController.Delete_Order); // order

  // Operasional
  router.get("/operasional", login, operasionalController.GetallOperasional); // Operasional
  router.get("/operasional/add", login, operasionalController.GetaddOperasional); // Operasional
  router.get("/operasional/edit/:id", login, operasionalController.GeteditOperasional); // Operasional
  router.post("/operasional", login, operasionalController.add_oper); // operasional
  router.post("/operasional/:id", login, operasionalController.update_oper); // operasional
  router.delete("/operasional/:id", login, operasionalController.Delete_Operasional); // operasional

  app.use(default_router, router);
};
