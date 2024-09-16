const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { Users } = require("../models");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    Users.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "email tidak ditemukan" });
        }

        // Anda perlu menambahkan logika untuk memverifikasi kata sandi di sini
        // if (!user.password == password) {
        //     return done(null, false);
        // }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "password salah!" });
          }
        });
      })
      .catch((err) => done(err));
  })
);

// Serialisasi dan deserialisasi pengguna
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
