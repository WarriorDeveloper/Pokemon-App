const { Pokemon, Type } = require('../db')

/**
 * 
 * @param {{name: string, image: string, hp: number, attack: number, defense: number, speed: number, height: number, weight: number, types: Array, region: string}} pokemon 
 */
const postPokemon = async (pokemon) => {
    const POKEMONS_API = 1279
    try {
        // identify types
        let typesDB = await Type.findAll()
        typesDB = typesDB.map(t => t.dataValues)
        const identifiedTypes = typesDB.filter(typeDB => {
            const match = pokemon.types.includes(typeDB.name)
            if (match) return true
            return false
        })
        if (identifiedTypes.length === 0) throw Error('invalid types')

        const idTypesAdd = identifiedTypes.map(type => type.ID)

        // pokemon creation
        const POKEMONS_DB = await Pokemon.findAll()
        const newId = POKEMONS_API + POKEMONS_DB.length + 1
        const newPokemon = await Pokemon.create({
            ID: newId,
            name: pokemon.name,
            image: pokemon.image,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            speed: pokemon.speed,
            height: pokemon.height,
            weight: pokemon.weight
        })
        await newPokemon.addTypes(idTypesAdd)

        return await Pokemon.findByPk(newId, {include: Type})
    } catch (error) {
        return {error: error.message}
    }
}

module.exports = postPokemon