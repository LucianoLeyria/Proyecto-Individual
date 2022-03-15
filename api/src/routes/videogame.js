const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const axios = require('axios').default;
const { Sequelize, Op } = require('sequelize');
const router = Router();
const { YOUR_API_KEY } = process.env;

router.get("/:id", async (req, res, next) => {

    const pk = req.params.id;
    let detail;

    if (pk.includes("-")) {      // este if es para encontrar los games que ya estan creados 
        try {
            detail = await Videogame.findOne({
                where: {
                    id: pk,
                },
                attributes: ["name", "description", "rating", "released", "platforms"],
                include: {
                    model: Genre,
                    attributes: ['name'],
                },
            })
        } catch (e) {
            console.log('Error en el primer entry', e)
        }
    } else {  // si la pk no incluye "-"
        try {
            const response = await axios.get(`https://api.rawg.io/api/games/${pk}?key=${YOUR_API_KEY}`)
            const elem = response.data;

            detail = {
                id: elem.id,
                name: elem.name,
                description: elem.description_raw,
                image: elem.background_image,
                rating: elem.rating,
                released: elem.released,
                genres: elem.genres,
                platforms: elem.platforms
                    .map((p) => p.platform.name)
                    .join(", "),


            }
        } catch (e) {
            console.log('Error en el segundo entry', e)
        }
    };
    if (detail) {
        res.send(detail);
    } else {
        res.status(404).send()
    };


});


router.post("/", async (req, res,) => {
    const { name, description, released, rating, genres, platforms, image } = req.body;
    console.log("PEPE", req.body)

    const newVideogame = await Videogame.create({
        name,
        description,
        released,
        image,
        rating,
        platforms,

    });
    console.log("PEPE", newVideogame)

    const searchGenres = await Genre.findAll({
        where: {
            name: genres
        },
    })
    newVideogame.setGenres(searchGenres);
    res.status(200).send(newVideogame);
})



module.exports = router;