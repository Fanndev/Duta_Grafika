const barangController = require("../../controller/admin/web/barang.controller");
const supplierController = require("../../controller/admin/web/supplier.controller");
const pegawaiController = require("../../controller/admin/web/pegawai.controller");
module.exports = (express, app, default_router) => {
  const router = express.Router();

  // pegawai
  router.get("/pegawai", pegawaiController.GetallPegawai); // pegawai
  router.post("/pegawai", pegawaiController.add_Pegawai); // pegawai
  router.put("/pegawai/:id", pegawaiController.update_Pegawai); // pegawai
  router.delete("/pegawai/:id", pegawaiController.Delete_Pegawai); // pegawai

  // Supplier
  router.get("/supplier", supplierController.GetallSupplier); // supplier
  router.post("/supplier", supplierController.add_Suplier); // supplier
  router.put("/supplier/:id", supplierController.update_Supplier); // supplier
  router.delete("/supplier/:id", supplierController.Delete_Supplier); // supplier

  // Barang
  router.get("/barang", barangController.GetallBarang); // barang
  router.post("/barang", barangController.add_Barang); // barang
  router.put("/barang/:id", barangController.update_Barang); // barang
  router.delete("/barang/:id", barangController.Delete_Barang); // barang

  app.use(default_router, router);
};
