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
  router.get("/pegawai/edit", pegawaiController.GetpageAdd); // pegawai
  router.post("/pegawai", pegawaiController.add_Pegawai); // pegawai
  router.put("/pegawai/:id", pegawaiController.update_Pegawai); // pegawai
  router.delete("/pegawai/:id", pegawaiController.Delete_Pegawai); // pegawai

  // Supplier
  router.get("/supplier", supplierController.GetallSupplier); // supplier
  router.get("/supplier/add", supplierController.GetaddSupplier); // supplier
  router.get("/supplier/edit", supplierController.GeteditSupplier); // supplier
  router.post("/supplier", supplierController.add_Suplier); // supplier
  router.put("/supplier/:id", supplierController.update_Supplier); // supplier
  router.delete("/supplier/:id", supplierController.Delete_Supplier); // supplier

  // Barang
  router.get("/barang", barangController.GetallBarang); // barang
  router.post("/barang", barangController.add_Barang); // barang
  router.put("/barang/:id", barangController.update_Barang); // barang
  router.delete("/barang/:id", barangController.Delete_Barang); // barang

  // Customer
  router.get("/customer", customerController.GetallCustomer); // Customer
  router.get("/customer/add", customerController.GetpageAdd); // Customer
  router.get("/customer/edit", customerController.GetpageEdit); // Customer

  // Transaksi
  router.get("/transaksi", transaksiController.GetallTransaksi); // Transaksi
  router.get("/transaksi/add", transaksiController.GetaddTransaksi); // Transaksi
  router.get("/transaksi/edit", transaksiController.GeteditTransaksi); // Transaksi

  // Order
  router.get("/order", orderController.GetallOrderan); // Order
  router.get("/order/add", orderController.GetaddOrderan); // Order
  router.get("/order/edit", orderController.GeteditOrderan); // Order

  // Operasional
  router.get("/operasional", operasionalController.GetallOperasional); // Operasional
  router.get("/operasional/add", operasionalController.GetaddOperasional); // Operasional
  router.get("/operasional/edit", operasionalController.GeteditOperasional); // Operasional

  app.use(default_router, router);
};
