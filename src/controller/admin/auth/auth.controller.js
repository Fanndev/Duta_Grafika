const passport = require("passport");

const adminLogin = (req, res) => {
  res.render("admin/auth/login", {
    title: "admin_auth",
    layout: "layouts/auth/auth_layouts",
  });
};

// admin login
const adminAuth = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

module.exports = { adminLogin, adminAuth };