import * as nodemailer from "nodemailer";
import * as smtpTransport from "nodemailer-smtp-transport";
import * as logger from "../libs/Logger";
import { delayInMS } from "../libs/utilities";
import config from "../config/config.core";
import { IMailTransporterDataInput } from "./entities/IMailTransporterDataInput";

class MailTransporter {
  private transporter: any = null;

  constructor() {
    const {
      smtpConfigurations: {
        host,
        port,
        from,
        auth: { username: user, password: pass }
      }
    } = config;

    this.transporter = nodemailer.createTransport(
      smtpTransport({
        host,
        port,
        secure: false,
        auth: {
            user,
            pass
        }

      })
    );
  }

  public async sendMail(options: IMailTransporterDataInput, cb: (success: boolean) => void) {
    const {
      smtpConfigurations: { retries, waitTime }
    } = config;

    const sendMail = async (data: IMailTransporterDataInput, attempt: number) => {
      if (attempt <= retries) {
        await this.transporter.sendMail(data, async (error: any, info: any) => {
          if (error) {
            logger.error(`MailTransporter.sendMail - Error while sending email: ${data.to} (try #${attempt}), error #${error.response}`);
            await delayInMS(waitTime);

            sendMail(data, attempt + 1);
          } else {
            logger.info(`MailTransporter.sendMail Message sent: ${data.to} ${info.messageId}`);
            cb(true);
          }
        });
      } else {
        logger.error(`MailTransporter.sendMail - Can not send email: ${data.to} (try #${attempt}):`);
        cb(false);
      }
    };
    await sendMail(options, 1);
  }
}

export default new MailTransporter();
