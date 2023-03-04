// ACTIONS TYPES
import { GET_ALL_POKEMONS, CLEAR_ALL_POKEMONS, SET_DETAIL_POKEMON, CLEAR_DETAIL_POKEMON, GET_NAME_POKEMON, FILTER_BY_TYPES, ORDERING, POST_POKEMON } from "./actions/actions-types"

const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    detailPokemon: {},
    status: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: [...action.payload.pokemonsList],
                types: action.payload.types,
                allPokemons: [...action.payload.pokemonsList]
            }

        case CLEAR_ALL_POKEMONS:
            return {
                ...state,
                pokemons: [],
                allPokemons: []
            }

        case SET_DETAIL_POKEMON:
            return {
                ...state,
                detailPokemon: action.payload
            }

        case CLEAR_DETAIL_POKEMON:
            return {
                ...state,
                detailPokemon: {}
            }

        case GET_NAME_POKEMON:
            if (action.payload === 'Pokemon is not found'){
                return {
                    ...state,
                    status: false,
                    pokemons: state.allPokemons
                }
            }

            return {
                ...state,
                pokemons: [...action.payload],
                status: true
            }

        case FILTER_BY_TYPES:
            if (action.payload === '') return {
                ...state,
                pokemons: state.allPokemons.sort((a,b)=>a.ID -b.ID),
            }
            if (action.payload === 'api' || action.payload === 'db') {
                let pokemonsFilteredOrigin = state.allPokemons.filter(pokemon => pokemon.origin === action.payload)
                return {
                    ...state,
                    pokemons: pokemonsFilteredOrigin
                }
            }
            let pokemonsFilteredType = state.allPokemons.filter(pokemon => pokemon.types.includes(action.payload))
            return {
                ...state,
                pokemons: pokemonsFilteredType
            }

        case ORDERING:
            let orderingFinal = state.allPokemons

            let orderingLettersUpward = [...state.pokemons].sort((a,b)=>{
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0;
            })

            let orderingAttackUpward = [...state.pokemons].sort((a,b)=> a.attack - b.attack)

            if (action.payload.ordering === 'upward'){
                if (action.payload.criteria === 'alphabetical'){
                    orderingFinal = orderingLettersUpward
                } else if (action.payload.criteria === 'attack'){
                    orderingFinal = orderingAttackUpward
                }
            } else if (action.payload.ordering === 'falling'){
                if (action.payload.criteria === 'alphabetical'){
                    orderingFinal = orderingLettersUpward.reverse()
                } else if (action.payload.criteria === 'attack'){
                    orderingFinal = orderingAttackUpward.reverse()
                }
            }

            return {...state, pokemons: orderingFinal}
        
        case POST_POKEMON:
            console.log(action.payload)
            if (action.payload === 'missing Data'){
                return {
                    ...state,
                    status: false
                }
            }
            return {
                ...state,
                status: true
            }

        default:
            return { ...state }
    }
}

export default reducer