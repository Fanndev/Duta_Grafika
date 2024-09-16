const adminController = require("../../controller/admin/web/dashboard.controller")
const { ensureLoggedIn } = require("connect-ensure-login");
const login = ensureLoggedIn({ redirectTo: "/auth/login" });

module.exports = (express, app, default_router) => {
  const router = express.Router();

  router.get("/dashboard",login, adminController.DashboardPage); // dashboard

  app.use(default_router, router);
};
