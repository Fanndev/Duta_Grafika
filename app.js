require("dotenv").config();
const express = require("express");
const app = express();
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// port
const port = process.env._PORT;

// express setup
app.use(methodOverride("_"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env._SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

const sequelize = require("./src/config/database/db");
sequelize
  .authenticate()
  .then(() => {
    console.log("Koneksi database berhasil");
  })
  .catch((err) => {
    console.log("Koneksi database gagal: " + err);
  });

// ejs setup
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(express.static("upload"));

// routes
require("./src/routes")(express, app);

// server
app.listen(port, () => {
  console.log(`Duta_Grafika running on port || ${port}`);
});
