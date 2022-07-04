import * as logger from "../libs/Logger";
// import { Connector } from "@gdo-enablers/dan-connector";

interface IHeaders {
  Accept: string;
  Authorization?: string;
}
interface IRequest {
  method: string;
  baseUrl: string;
  url: string;
  data: string;
  headers?: IHeaders;
}

class BaseService {
  // private connector: Connector;

  constructor() {
    // this.connector = Connector.getInstance();
  }

  public generateRequest(requestOptions: IRequest) {

    logger.debug("BaseService - generateRequest:::::::", JSON.stringify(requestOptions, null, 2));
    // return this.connector.requestApi(requestOptions);
  }

}

export default new BaseService();
