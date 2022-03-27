const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const axios = require("axios").default;
const router = Router();
const { YOUR_API_KEY } = process.env;

router.get("/:id", async (req, res, next) => {
  const pk = req.params.id;
  let detail;

  if (pk.includes("-")) {
    // este if es para encontrar los games que ya estan creados
    try {
      detail = await Videogame.findOne({
        where: {
          id: pk,
        },
        include: {
          model: Genre,
          attributes: ["name"],
        },
      });
    } catch (e) {
      console.log("Error en el primer entry", e);
    }
  } else {
    // si la pk no incluye "-"
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${pk}?key=${YOUR_API_KEY}`
      );
      const elem = response.data;

      detail = {
        id: elem.id,
        name: elem.name,
        description: elem.description_raw,
        image: elem.background_image,
        rating: elem.rating,
        released: elem.released,
        genres: elem.genres,
        platforms: elem.platforms.map((p) => p.platform.name).join(", "),
      };
    } catch (e) {
      console.log("Error en el segundo entry", e);
    }
  }
  if (detail) {
    res.send(detail);
  } else {
    res.status(404).send();
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    genres,
    platforms,
    image,
    createdInDb,
  } = req.body;

  const newVideogame = await Videogame.create({
    name,
    description,
    released,
    image,
    rating,
    platforms,
    createdInDb,
  });

  const searchGenres = await Genre.findAll({
    where: {
      name: genres,
    },
  });
  newVideogame.setGenres(searchGenres);
  res.status(200).send(newVideogame);
});

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;

  try {
    return await Videogame.destroy({
      where: {
        id: id,
      },
    }).then(
      function (rowDeleted) {
        if (rowDeleted === 1) {
          res.status(200).json("borrado con exito");
        }
      },
      function (err) {
        res.status(408).json("no se borro nada, el parametro estaba mal");
      }
    );
  } catch (error) {
    res.status(406).json("no se borro nada");
  }
});

module.exports = router;
