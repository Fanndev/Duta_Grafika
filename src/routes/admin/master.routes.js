const barangController = require("../../controller/admin/web/barang.controller");
const supplierController = require("../../controller/admin/web/supplier.controller");
const pegawaiController = require("../../controller/admin/web/pegawai.controller");
const customerController = require("../../controller/admin/web/customer.controller");
const transaksiController = require("../../controller/admin/web/transaksi.controller");
const orderController = require("../../controller/admin/web/orderan.controller");
const operasionalController = require("../../controller/admin/web/operasional.controller")
module.exports = (express, app, default_router) => {
  const router = express.Router();

  // pegawai
  router.get("/pegawai", pegawaiController.GetallPegawai); // pegawai
  router.get("/pegawai/add", pegawaiController.GetpageAdd); // pegawai
  router.get("/pegawai/edit/:id", pegawaiController.GetpageEdit); // pegawai
  router.post("/pegawai", pegawaiController.add_Pegawai); // pegawai
  router.post("/pegawai/:id", pegawaiController.update_Pegawai); // pegawai
  router.delete("/pegawai/:id", pegawaiController.Delete_Pegawai); // pegawai

  // Supplier
  router.get("/supplier", supplierController.GetallSupplier); // supplier
  router.get("/supplier/add", supplierController.GetaddSupplier); // supplier
  router.get("/supplier/edit/:id", supplierController.GeteditSupplier); // supplier
  router.post("/supplier", supplierController.add_Suplier); // supplier
  router.post("/supplier/:id", supplierController.update_Supplier); // supplier
  router.delete("/supplier/:id", supplierController.Delete_Supplier); // supplier

  // Barang
  router.get("/barang", barangController.GetallBarang); // barang
  router.get("/barang/add", barangController.GetBarangaddPage); // barang
  router.get("/barang/edit/:id", barangController.GetBarangeditPage); // barang
  router.post("/barang", barangController.add_Barang); // barang
  router.post("/barang/:id", barangController.update_Barang); // barang
  router.delete("/barang/:id", barangController.Delete_Barang); // barang

  // Customer
  router.get("/customer", customerController.GetallCustomer); // Customer
  router.get("/customer/add", customerController.GetpageAdd); // Customer
  router.get("/customer/edit/:id", customerController.GetpageEdit); // Customer
  router.post("/customer", customerController.add_customer); // customer
  router.post("/customer/:id", customerController.update_Customer); // customer
  router.delete("/customer/:id", customerController.Delete_Customer); // customer

  // Transaksi
  router.get("/transaksi", transaksiController.GetallTransaksi); // Transaksi
  router.get("/transaksi/add", transaksiController.GetaddTransaksi); // Transaksi
  router.get("/transaksi/edit/:id", transaksiController.GeteditTransaksi); // Transaksi
  router.post("/transaksi", transaksiController.add_transaksi); // transaksi
  router.post("/transaksi/:id", transaksiController.update_transaksi); // transaksi
  router.delete("/transaksi/:id", transaksiController.Delete_transaksi); // transaksi

  // Order
  router.get("/order", orderController.GetallOrderan); // Order
  router.get("/order/add", orderController.GetaddOrderan); // Order
  router.get("/order/edit/:id", orderController.GeteditOrderan); // Order
  router.post("/order", orderController.add_Order); // order
  router.post("/order/:id", orderController.update_order); // order
  router.delete("/order/:id", orderController.Delete_Order); // order

  // Operasional
  router.get("/operasional", operasionalController.GetallOperasional); // Operasional
  router.get("/operasional/add", operasionalController.GetaddOperasional); // Operasional
  router.get("/operasional/edit/:id", operasionalController.GeteditOperasional); // Operasional
  router.post("/operasional", operasionalController.add_oper); // operasional
  router.post("/operasional/:id", operasionalController.update_oper); // operasional
  router.delete("/operasional/:id", operasionalController.Delete_Operasional); // operasional

  app.use(default_router, router);
};
