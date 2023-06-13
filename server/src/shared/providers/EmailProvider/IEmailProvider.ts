export interface ISendEmailData {
  to: string;
  subject: string;
  filePath: string;
  variables: any;
}

export interface IEmailProvider {
  sendEmail(data: ISendEmailData): Promise<void>;
}
