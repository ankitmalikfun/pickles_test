import Server from "../Server";
import { config } from "../config/config.test";
import * as sinon from "sinon";
import * as nodemailer from "nodemailer";
import { mailTransporterService } from "../services";
//import { Connector } from "@gdo-enablers/dan-connector";
const server = new Server(config);

describe("Functional Testing Services", () => {
  const sandbox = sinon.createSandbox();
  //sandbox.stub(Connector.prototype, "requestApi");
  let initDBMigrate;
  beforeAll((done) => {
    server.init();
    done();
  });

  describe("notification Service ", () => {
    it("Should successfully return sendMail ", async (done) => {
      try {
        sandbox.stub(nodemailer, "sendMail").returns(
          Promise.resolve({
            messageId: "dhhdhd"
          })
        );
        const result = await mailTransporterService.sendMail({
          to: "string",
          from: "string",
          html: "string",
          subject: "string",
          text: "string"
        }, (success) => {
          if (success) {
            // Do Something
          }
        });
        expect(result).toThrow(new Error());
      } catch (err) {
        // err thetet
      }
      done();
    });
  });

});
