const adminController = require("../../controller/admin/web/dashboard.controller")

module.exports = (express, app, default_router) => {
  const router = express.Router();

  router.get("/", adminController.DashboardPage); // dashboard

  app.use(default_router, router);
};
