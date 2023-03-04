const axios = require('axios')
const { Pokemon, Type } = require('../db')

const getPokemons = async (nameQuerySearch) => {
    if (nameQuerySearch) {
        nameQuerySearch = nameQuerySearch.toLowerCase()
        const pokemonsNameQuerySearch = []

        try {
            const response = await axios(`https://pokeapi.co/api/v2/pokemon/${nameQuerySearch}`)
            const pokemon = await response.data
            if (pokemon){
                pokemonsNameQuerySearch.push({
                    ID: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other['official-artwork']['front_default'],
                    attack: pokemon.stats[1].base_stat,
                    types: pokemon.types.map(type => type.type.name),
                    origin: 'api'
                })
            }
        } catch (error) {}

        try {
            const pokemon = await Pokemon.findOne({
                where: {
                    name: nameQuerySearch
                },
                include: Type
            })

            if(pokemon){
                pokemonsNameQuerySearch.push({
                    ID: pokemon.ID,
                    name: pokemon.name,
                    image: pokemon.image,
                    attack: pokemon.attack,
                    types: pokemon.Types.map(type => type.name),
                    origin: 'db'
                })
            }

            // console.log(pokemonsNameQuerySearch)
            if (pokemonsNameQuerySearch.length === 0) throw Error('Pokemon is not found')
            return pokemonsNameQuerySearch
        } catch (error) {
            return {error: error.message}
        }
    }
    const pokemons = []
    for (let i = 1; i <= 40; i++) {
        try {

            // BUSQUEDA DE LA API
            const response = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)
            const { name, sprites, types, stats } = await response.data

            const pokemon = {
                ID: i,
                name,
                image: sprites.front_default, // sprites.other['official-artwork']['front_default']
                types: types.map(type => type.type.name),
                attack: stats[1].base_stat,
                origin: 'api'
            }

            pokemons.push(pokemon)
        } catch (error) {
            return { error: error.message }
        }
    }

    try {
        // BUSCANDO EN LA DB
        console.log('buscando en la DB...')
        const pokemonsDBPure = await Pokemon.findAll({ include: Type })

        if (pokemonsDBPure.length !== 0) {
            const pokemonsAddList = pokemonsDBPure.map(pokemonDB => {
                return {
                    ID: pokemonDB.ID,
                    name: pokemonDB.name,
                    image: pokemonDB.image,
                    attack: pokemonDB.attack,
                    types: pokemonDB.Types.map(type => type.name),
                    origin: 'db'
                }
            })

            pokemons.push(...pokemonsAddList)
        }

    } catch (error) {
        return { error: error.message }
    }

    return pokemons
}

module.exports = getPokemons



/*

const response = await axios(`https://pokeapi.co/api/v2/pokemon/${nameQuerySearch}`)
            const pokemon = await response.data
            if (pokemon){
                pokemonsNameQuerySearch.push({
                    ID: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other['official-artwork']['front_default'],
                    attack: pokemon.stats[1].base_stat,
                    types: pokemon.types.map(type => type.type.name),
                    origin: 'api'
                })
            }

const pokemon = await Pokemon.findOne({
                where: {
                    name: nameQuerySearch
                },
                include: Type
            })
            // if (!pokemon) throw Error('Pokemon no encontrado')
            if(pokemon){
                pokemonsNameQuerySearch.push({
                    ID: pokemon.ID,
                    name: pokemon.name,
                    image: pokemon.image,
                    attack: pokemon.attack,
                    types: pokemon.Types.map(type => type.name),
                    origin: 'db'
                })
            }

*/