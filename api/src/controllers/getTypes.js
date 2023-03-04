const axios = require('axios')
const { Type } = require('../db')

const getTypes = async () => {
    const types = await Type.findAll()
    if (types.length === 0) {
        const response = await axios('https://pokeapi.co/api/v2/type/')
        const typesAPI = await response.data.results
        for (let i = 0; i < typesAPI.length; i++) {
            try {
                await Type.create({
                    ID: i,
                    name: typesAPI[i].name
                })
            } catch (error) {
                return {error: error.message}
            }
        }

        return await Type.findAll()
    }
    return types
}

module.exports = getTypes