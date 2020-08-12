import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const mailConfig = require('../config/mail.json');

const {
  host,
  port,
  user,
  pass,
} = mailConfig

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail'),
  ext: '.html',
}));

export default transport;