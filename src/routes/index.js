module.exports = (express, app) => {
  const web_default = ``;

  require("./admin/auth.routes")(express, app, web_default);
  require("./admin/admin.routes")(express, app, web_default);
  require("./admin/master.routes")(express, app, web_default);

  // app.use((req, res, next) => {
  //   res.status(404).render("404", {
  //     title: "404 - Page not found",
  //     layout: "layouts/setting/setting_layouts"
  //   });
  // });
};
