const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require('./pokemonRouter')
const typeRouter = require('./typeRouter')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonRouter)
router.use('/types', typeRouter)

module.exports = router;

/*
NOTAS DE ENDPOINTS
GET localhost:3001/types === para cargar los types a la DB
POST localhost:3001/pokemons === para subir un nuevo pokemon a la DB
    body {
        "name": "Kuki",
        "image": "shinobu",
        "hp": 3,
        "attack": 3,
        "defense": 3,
        "speed": 3,
        "height": 3,
        "weight": 3,
        "types": ["normal", "electric"]
    }

GET localhost:3001/pokemons/ === para listar 40 primeros pokemones de la API (tarda un rato)
GET localhost:3001/pokemons/query: name = string === para buscar pokemon por nombre
GET localhost:3001/pokemons/ID === para buscar un pokemon por id, tanto en la api, como en la DB
*/