import * as logger from '../../libs/Logger';
import { ICreateInput } from "./entities";
import { mailTransporterService } from "../../services";

class NotificationController {
  /**
   * Method for sending email notification
   * @param body Data received from request body
   */
  public async create({ body: requestBody }: ICreateInput) {
    try {
      logger.info("NotificationController - create:", requestBody);

      const { email_to, subject, body } = requestBody;

      mailTransporterService.sendMail({
        to: email_to, // list of receivers
        from: 'Sender Name <sender@example.com>', // sender address
        html: body, // html body
        subject, // Subject line
        text: body // plain text body
      }, success => {
        if (success) {
          logger.debug('Email sent successfully', email_to);
        } else {
          logger.error('Email can not be sent');
        }
      });

      return '';
    } catch (err) {
      logger.info("NotificationController - create error:", err);
    }
  }


}

export default new NotificationController();
