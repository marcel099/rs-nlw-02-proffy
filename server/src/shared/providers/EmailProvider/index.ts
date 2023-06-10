import { IEmailProvider } from './IEmailProvider';
import { GmailEmailProvider } from './implementations/GmailEmailProvider';

export const emailProvider: IEmailProvider = new GmailEmailProvider();
