


 const DashboardPage = async (req, res) => {
  res.render("admin/dashboard", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

module.exports = {
    DashboardPage
}