const dotenv = require('dotenv');

dotenv.config();

const {
  PORT,
  EMAIL,
  EMAIL_PASSWORD,
} = process.env;

module.exports = {
  port  : PORT,
  email : EMAIL,
  emailPassword : EMAIL_PASSWORD
}