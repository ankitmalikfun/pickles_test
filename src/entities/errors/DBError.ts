import { StatusCodes } from "../../libs/constants";
import BaseError from "./BaseError";
import IError from "./IError";

/**
 * Class representing an API error.
 * @extends BaseError
 */
class DBError extends BaseError {
  /**
   * Creates Db  error.
   * @param {string} message - Error message.
   * @param {string} status - Status code.
   * @param {IError[]} data - error details.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message: string, status: number = StatusCodes.INTERNAL_SERVER_ERROR, data: IError[] = [], type: string = DBError.name) {
    super(message, status, data, type, false);
  }
}

export default DBError;
