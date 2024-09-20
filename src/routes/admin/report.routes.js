const {
    downloadBarangReport,
    downloadCustomerReport,
    downloadJurnalReport,
    downloadOperasionalReport,
    downloadOrderanReport,
    downloadPegawaiReport,
    downloadSupplierReport,
    downloadTransaksiReport
} = require("../../controller/admin/web/report/web.controller")
const { ensureLoggedIn } = require("connect-ensure-login");
const login = ensureLoggedIn({ redirectTo: "/auth/login" });

module.exports = (express, app, default_router) => {
  const router = express.Router();

  router.post("/report-barang", login, downloadBarangReport); // barang
  router.post("/report-customer", login, downloadCustomerReport); //customer
  router.post("/report-jurnal", login, downloadJurnalReport); //jurnal
  router.post("/report-operasional", login, downloadOperasionalReport); //operasional
  router.post("/report-order", login, downloadOrderanReport); //order
  router.post("/report-pegawai", login, downloadPegawaiReport); //pegawai
  router.post("/report-supplier", login, downloadSupplierReport); //supplier
  router.post("/report-transaksi", login, downloadTransaksiReport); //transaksi

  app.use(default_router, router);
};
