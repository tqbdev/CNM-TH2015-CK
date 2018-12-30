const axios = require('axios')

const config = require('../config/config')

module.exports = {
  verity(response) {
    return axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${config.googleRecaptcha.secretKey}&response=${response}`);
  }
}
