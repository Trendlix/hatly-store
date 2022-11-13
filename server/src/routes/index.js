const Router = require('express');
const routes = Router();

const contactUsRoutes = require('./api/contactUs.routes');

routes.use('/contact-us', contactUsRoutes);

module.exports = routes;