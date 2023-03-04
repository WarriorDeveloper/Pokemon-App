const axios = require('axios')
const {Pokemon, Type} = require('../db')

const getPokemonById = async (id)=>{
    try {
        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = await response.data
        return {
            ID: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other['official-artwork']['front_default'],
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types.map(type => type.type.name),
        }
    } catch (error) {
        console.log('buscando en la DB...')
        try {
            const pokemon = await Pokemon.findByPk(id, {include: Type})
            if (!pokemon) throw Error('Pokemon no encontrado')
            return {
                ID: pokemon.dataValues.ID,
                name: pokemon.dataValues.name,
                image: pokemon.dataValues.image,
                hp: pokemon.dataValues.hp,
                attack: pokemon.dataValues.attack,
                defense: pokemon.dataValues.defense,
                speed: pokemon.dataValues.speed,
                height: pokemon.dataValues.height,
                weight: pokemon.dataValues.weight,
                types: pokemon.dataValues.Types.map(type => type.name),
            }
        } catch (error) {
            return { error: error.message }
        }
    }
}

module.exports = getPokemonById