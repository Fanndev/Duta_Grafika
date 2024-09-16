const authController = require("../../controller/admin/auth/auth.controller");
const { ensureLoggedOut, ensureLoggedIn } = require("connect-ensure-login");

module.exports = (express, app, default_router) => {
  const router = express.Router();

  // redirect
  router.get("/", (req, res) => {
    res.redirect("/auth/login");
  });

  router.get("/auth/login", authController.adminLogin);
  router.post(
    "/auth/login",
    ensureLoggedOut({ redirectTo: "/dashboard" }),
    authController.adminAuth
  );

  router.get(
    "/auth/logout",
    ensureLoggedIn({ redirectTo: "/auth/login" }),
    (req, res) => {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/auth/login");
      });
    }
  );

  app.use(default_router, router);
};
