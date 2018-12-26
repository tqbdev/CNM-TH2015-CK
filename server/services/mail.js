const nodemailer = require('nodemailer')

const config = require('../config/config')

const transporter = nodemailer.createTransport(config.gmailSmtp)

const message = {
  from: 'Admin <internet.banking.th2015@gmail.com>',
  to: '',
  subject: '',
  text: '',
  auth: config.gmailAccount
}

module.exports = {
  sendTranferCode(user, code) {
    message.to = `${user.name} <${user.email}>`
    return transporter.sendMail(message)
  },
  sendInitialPassword(user, password) {
    message.to = `${user.name} <${user.email}>`
    return transporter.sendMail(message)
  }
}
