const express = require('express')
const contactUsController = require('../../controllers/contactUsController');

const routes = express.Router();

routes.route('/').post(contactUsController.sendEmail);

module.exports = routes;