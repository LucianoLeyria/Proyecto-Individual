const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const axios = require('axios').default;
const { YOUR_API_KEY } = process.env;
const { Op } = require('sequelize')
const router = Router();

router.get('/', async (req, res, next) => {
    if (!req.query.name) {
        try {
            const gamesDbAll = await Videogame.findAll({ include: [Genre] }); // traeme todos los de la db
            const gamesDb = gamesDbAll.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    image: e.background_image,
                    rating: e.rating,
                    platforms: e.platforms,
                    released: e.released,
                    genres: e.genres?.map(e => e.name),
                    source: "Created",
                };
            });
            let gamesApi;
            let pagesApi = [];

            let response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)

            for (let i = 1; i <= 5; i++) {
                gamesApi = response.data.results.map((game) => {   // traeme todos los de la api
                    return {
                        id: game.id,
                        name: game.name,
                        image: game.background_image,
                        rating: game.rating,
                        released: game.released,
                        platforms: game.platforms.map((p) => p.platform.name), //ask .join(", "),  si los quiero recibir como array descomentar el join.
                        genres: game.genres?.map(e => e.name),
                        source: "Api",
                    };
                });

                pagesApi = pagesApi.concat(gamesApi); // le meto los juegos al array pagesApi
                response = await axios.get(response.data.next)
            }
            console.log(pagesApi.length) // me aseguro q vengan 100 games


            res.status(200).send(pagesApi.concat(gamesDb)); // concateno games api + games
        } catch (e) {
            console.log(e)
        }

    } else if (req.query.name) {     // si lo llaman x query -------------------------------------------------

        console.log("QUERY=", req.query.name);
        try {
            let count = 0;
            let juegosDb = [];
            let pages = [];
            let pepito = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${req.query.name}`
            );
            console.log("IMPORTANT", pepito.data)
            let curr = pepito.data;

            while (count < 4) {
                let findNext = await axios.get(curr.next);
                console.log("PEPE", curr.next)
                pages.concat(findNext.data.results);
                curr = findNext.data;
                count++;
            }

            let findDbGame = await Videogame.findAll({

                where: {
                    name: { [Op.iLike]: `%${req.query.name}%` },
                },
                include: { model: Genre }
            });
            juegosDb.push(findDbGame);
            console.log("PAGES2=", pages.length)
            for (var i = 0; i < pages.length; i++) {
                // filter out games in api pages which contain req query name
                var y = pages[i].results
                    .filter(elem =>
                        elem.name.toLowerCase().includes(req.query.name.toLowerCase())
                    )
                    .map(elem => {
                        return {
                            id: elem.id,
                            name: elem.name,
                            genres: elem.genres,
                            image: elem.background_image,
                            rating: elem.rating,
                            platforms: elem.platforms?.map(elem => elem.platform.name),
                        };
                    });
                juegosDb.push(y); // push every obj which contains req.query in its name prop
            }

            return res.status(200).send(juegosDb);
        } catch (e) {
            console.log("ERRORASD", e)

        }

    }


});














module.exports = router;