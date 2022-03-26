const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Videogames = require('./videogames');
const Videogame = require('./videogame');
const Genres = require('./genres')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/api/videogames', Videogames)
router.use('/api/videogame', Videogame)
router.use('/api/genres', Genres)


module.exports = router;
