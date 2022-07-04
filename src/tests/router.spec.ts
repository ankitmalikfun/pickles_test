import * as supertest from "supertest";
import { API_PREFIX } from "../../src/libs/constants";
import Server from "../../src/Server";
import { config } from "../config/config.test";

const server = new Server(config);

describe("Health Check", () => {
  const request = supertest(server.application);

  beforeAll(done => {
    server.init();
    done();
  });

  it("config-status should return 200", done => {
    request.get(`${API_PREFIX}/version`).expect(200, done);
  });
  it("should return 404 page not found", done => {
    request.get("/").expect(404, done);
  });
  it("should return 404 ", done => {
    request.get("/fake-url").expect(404, done);
  });
  it("should return 200", done => {
    request.get(`${API_PREFIX}/health-check`).expect(200, done);
  });
});
