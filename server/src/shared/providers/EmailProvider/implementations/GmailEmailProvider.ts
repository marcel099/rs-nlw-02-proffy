import handlebars from 'handlebars';
import fs from 'node:fs';
import nodemailer, { Transporter } from 'nodemailer';

import { IEmailProvider, ISendEmailData } from '../IEmailProvider';

export class GmailEmailProvider implements IEmailProvider {
  constructor() {
    this.client = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: process.env.NODEMAILER_GMAIL_ADRESS,
        pass: process.env.NODEMAILER_GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  private client: Transporter;

  private from = `Proffy <${process.env.NODEMAILER_GMAIL_ADRESS}>`;

  async sendEmail({
    to,
    subject,
    filePath,
    variables,
  }: ISendEmailData): Promise<void> {
    const templateFileContent = fs.readFileSync(filePath).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: this.from,
      subject,
      html: templateHTML,
    });
  }
}
