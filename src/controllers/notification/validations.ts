import { isString } from "../../libs/utilities";
import { commonValidations } from "../commonValidations";
interface ISubtenant {
  id: string;
}

export interface ITenantRequest {
  id: string;
  correlationId: string;
  subTenants: ISubtenant[];
}

export default Object.freeze({
  create: {
    email_to: {
      exists: true,
      errorMessage: "email_to is required",
      custom: {
        options: (email_to: string): boolean => {
          return isString(email_to);
        },
        errorMessage: "email_to should be string"
      }
    },
    subject: {
      exists: true,
      errorMessage: "subject is required",
      custom: {
        options: (subject: string): boolean => {
          return isString(subject);
        },
        errorMessage: "subject should be string"
      }
    },
    body: {
      exists: true,
      errorMessage: "body is required",
      custom: {
        options: (body: string): boolean => {
          return isString(body);
        },
        errorMessage: "body should be string"
      }
    }
  }
});
