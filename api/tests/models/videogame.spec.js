const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

const vgCompl = {
  id: "7bd46617-d105-457b-a88c-66c344597298",
  name: "Primer game",
  description: "Descripcion de ejemplo",
  platforms: ["PC", "Android"],
};
const vgId = {
  id: null,
  name: "Segundo game",
  description: "Descripcion de ejemplo",
  platforms: ["PC", "Android"],
};
const vgName = {
  id: "7bd46617-d105-457b-a88c-66c344597298",
  name: null,
  description: "Descripcion de ejemplo",
  platforms: ["PC", "Android"],
};
const vgDescr = {
  id: "7bd46617-d105-457b-a88c-66c344597298",
  name: "Cuarto game",
  description: null,
  platforms: ["PC", "Android"],
};
const vgPlat = {
  id: "7bd46617-d105-457b-a88c-66c344597298",
  name: "Quinto game",
  description: "Descripcion de ejemplo",
  platforms: null,
};

describe("***MODELO VIDEOGAME***", () => {
  describe("Validators", () => {
    describe("id", () => {
      it("deberia mostrar un error si el id es null", (done) => {
        Videogame.create(vgId)
          .then(() => done(new Error("Se requiere un id valido")))
          .catch(() => done());
      });
      it("debería funcionar cuando es un name valido", () => {
        Videogame.create(vgCompl);
      });
    });
    describe("name", () => {
      it("deberia mostrar un error si name es null", (done) => {
        Videogame.create(vgName)
          .then(() => done(new Error("Se requiere un name valido")))
          .catch(() => done());
      });
      it("debería funcionar cuando es un name valido", () => {
        Videogame.create(vgCompl);
      });
    });
    describe("description", () => {
      it("deberia mostrar un error si description es null", (done) => {
        Videogame.create(vgDescr)
          .then(() => done(new Error("Se requiere una description valida")))
          .catch(() => done());
      });
      it("debería funcionar cuando es una description valida", () => {
        Videogame.create(vgCompl);
      });
    });
    describe("platforms", () => {
      it("deberia mostrar un error si platforms es null", (done) => {
        Videogame.create(vgPlat)
          .then(() => done(new Error("Se requieren platforms validas")))
          .catch(() => done());
      });
      it("debería funcionar cuando son platforms validas", () => {
        Videogame.create(vgCompl);
      });
    });
  });
});
