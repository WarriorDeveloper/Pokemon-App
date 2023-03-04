import { GET_ALL_POKEMONS, CLEAR_ALL_POKEMONS, SET_DETAIL_POKEMON, CLEAR_DETAIL_POKEMON, GET_NAME_POKEMON, FILTER_BY_TYPES, ORDERING, POST_POKEMON } from "./actions-types"
import axios from 'axios'

export const getAllPokemons = () => {
    return async function (dispatch) {
        const responseTypes = await axios('/types')
        const types = responseTypes.data

        const response = await axios('/pokemons')
        const pokemonsList = await response.data
        return dispatch({ type: GET_ALL_POKEMONS, payload: { pokemonsList, types } })
    }
}

export const clearAllPokemons = () => {
    return { type: CLEAR_ALL_POKEMONS }
}

export const setDetailPokemon = (id) => {
    return async function (dispatch) {
        const response = await axios(`/pokemons/${id}`)
        const pokemonDetail = await response.data
        return dispatch({ type: SET_DETAIL_POKEMON, payload: pokemonDetail })
    }
}

export const clearDetailPokemon = () => {
    return { type: CLEAR_DETAIL_POKEMON }
}

export const getNamePokemon = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios(`/pokemons?name=${name}`)
            const pokemons = await response.data
            return dispatch({ type: GET_NAME_POKEMON, payload: pokemons })
        } catch (error) {
            return dispatch({ type: GET_NAME_POKEMON, payload: error.response.data })
        }
    }
}

export const filterByTypes = (filter) => {
    return { type: FILTER_BY_TYPES, payload: filter }
}

export const ordering = (ordering) => {
    return { type: ORDERING, payload: ordering }
}

export const postPokemon = (pokemon) => {
    return async function (dispatch) {
        try {
            const response = await axios.post('/pokemons', pokemon)
            const data = await response.data
            return dispatch({ type: POST_POKEMON, payload: data })
        } catch (error) {
            return dispatch({ type: POST_POKEMON, payload: error.response.data })
        }
    }
}