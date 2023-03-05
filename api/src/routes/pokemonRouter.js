const router = require('express').Router()

// CONTROLLERS
const getPokemons = require('../controllers/getPokemons')
const getPokemonById = require('../controllers/getPokemonById')
const postPokemon = require('../controllers/postPokemon')

router.get('/', async (req, res)=>{
    try {
        const {name} = req.query
        const pokemonsList = await getPokemons(name)
        if (pokemonsList.error) throw Error(pokemonsList.error)
        res.status(200).json(pokemonsList)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/:idPokemon', async (req, res)=>{
    try {
        const {idPokemon} = req.params
        if (isNaN(Number(idPokemon))) throw Error('the ID must be a number')
        const pokemon = await getPokemonById(Number(idPokemon))
        if (pokemon.error) throw Error(pokemon.error)
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/', async(req, res)=>{
    try {
        const {name, image, hp, attack, defense, speed, height, weight, types} = req.body
        if(!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types) throw Error('missing Data')
        if (isNaN(Number(hp)) || isNaN(Number(attack)) || isNaN(Number(defense)) || isNaN(Number(speed)) || isNaN(Number(height)) || isNaN(Number(weight))) throw Error('data type error')
        if (!Array.isArray(types)) throw Error('types must be an array')
        if (types.length === 0) throw Error('there must be at least one type')

        const newPokemon = await postPokemon(req.body)
        if(newPokemon.error) throw Error(newPokemon.error)
        res.status(200).json({
            message: 'successfully created pokemon', //eliminar
            newPokemon
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router