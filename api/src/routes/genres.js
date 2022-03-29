const { Router } = require("express");
const { Genre } = require("../db");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

router.get("/", async (req, res) => {
  try {
    const genresAPI = await axios.get(
      `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
    );
    genresAPI.data.results.forEach((p) => {
      Genre.findOrCreate({
        where: { id: p.id, name: p.name },
      });
    });
    const genresDB = await Genre.findAll();
    res.json(genresDB);
  } catch (error) {
    res.status(404).json({ error: "Genre not found" });
  }
});
module.exports = router;
