const {
    downloadBarangReport
} = require("../../controller/admin/web/report/web.controller")
const { ensureLoggedIn } = require("connect-ensure-login");
const login = ensureLoggedIn({ redirectTo: "/auth/login" });

module.exports = (express, app, default_router) => {
  const router = express.Router();

  router.post("/barang", login, downloadBarangReport); // barang

  app.use(default_router, router);
};
