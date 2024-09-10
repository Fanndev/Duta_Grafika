const authController = require('../../controller/admin/auth.controller')

module.exports = (express, app, default_router) => {
    const router = express.Router();

   

    app.use(default_router, router);
};