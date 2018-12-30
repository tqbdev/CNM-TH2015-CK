const nodemailer = require('nodemailer');

const config = require('../config/config');

const transporter = nodemailer.createTransport(config.gmailSmtp);

const message = {
  from: 'Admin <internet.banking.th2015@gmail.com>',
  to: '',
  subject: '',
  html: '',
  text: '',
  auth: config.gmailAccount
};

module.exports = {
  sendTranferCode(user, code) {
    message.subject = '[TRANSFER] - OTP';
    message.to = `${user.name} <${user.email}>`;
    message.html = `Dear ${user.name},<br/>\
                    Your account create a transaction\
                    with your email: ${user.email}<br/>\
                    Your OTP code: ${code}<br/>\
                    Enter OTP code in our website to complete this transaction.<br/>\
                    Thank you for choosing our service.<br/>\
                    If you not request this transaction, please ignore this mail.`;
    message.text = `Dear ${user.name},\r\n\
                    Your account create a transaction\
                    with your email: ${user.email}\r\n\
                    Your OTP code: ${code}\r\n\
                    Enter OTP code in our website to complete this transaction.\r\n\
                    Thank you for choosing our service.\r\n\
                    If you not request this transaction, please ignore this mail.`;
    return transporter.sendMail(message);
  },
  sendInitialPassword(user, password) {
    message.subject = '[CREATED ACCOUNT] - PASSWORD';
    message.to = `${user.name} <${user.email}>`;
    message.html = `Dear ${user.name},<br/>\
                    Your account in our service is\
                    created with your email: ${user.email}<br/>\
                    Your password: ${password}<br/>\
                    Thank you for choosing our service.`;
    message.text = `Dear ${user.name},\r\n\
                    Your account in our service is\
                    created with your email: ${user.email}\r\n\
                    Your password: ${password}\r\n\
                    Thank you for choosing our service.`;
    return transporter.sendMail(message);
  }
};
