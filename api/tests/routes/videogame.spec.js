const { expect } = require("chai");
const supertest = require("supertest");
const supertestSession = require("supertest-session");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

describe("GET /genres", () => {
  it("should get 200", () => agent.get("/genres").expect(200));
  it("respondes genres name", () =>
    agent.get("/genres").then((res) => {
      expect(res.body[0].name).to.equal("Action");
    }));
  it("respondes genres id", () =>
    agent.get("/genres").then((res) => {
      expect(res.body[0].id).to.equal(1);
    }));
});
