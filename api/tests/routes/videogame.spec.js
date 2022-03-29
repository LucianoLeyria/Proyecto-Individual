/* eslint-disable import/no-extraneous-dependencies */
const expect = require("chai").expect;
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);

const videogame = {
  name: "nuevo GAME",
  description: "Nuevo videojuego creado con /POST",
  genres: ["Indie", "RPG", "Adventure"],
  platforms: ["PC", "Android"],
};

describe("***RUTAS VIDEOGAMES***", () => {
  describe("GET /videogame/{idVideogame}", () => {
    it("should get 200", () => agent.get("/videogame/3498").expect(200));
  });
  describe("GET /genres", () => {
    it("should get 200", () => agent.get("/genres").expect(200));
  });
  describe("POST /videogame", () => {
    it("should get 200", () =>
      agent.post("/videogame").send(videogame).expect(200));
  });
});
