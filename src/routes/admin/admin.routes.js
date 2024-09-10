const adminController = require("../../controller/admin/admin.controller");
const dashboardController = require("../../controller/admin/dashboard.controller");

module.exports = (express, app, default_router) => {
  const router = express.Router();


  app.use(default_router, router);
};
