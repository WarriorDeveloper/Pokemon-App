// STYLES
import style from './ListPokemons.module.css'

import { useState, useEffect } from "react"

// COMPONENTS
import PokemonCard from "../PokemonCard/PokemonCard"

const ListPokemons = ({ pokemons }) => {
    const PAGINATED_POKEMON = 12
    let pokemonsPaginated = []
    for (let i = 0; i < pokemons.length; i += PAGINATED_POKEMON) {
        pokemonsPaginated.push(pokemons.slice(i, i + PAGINATED_POKEMON))
    }

    const [page, setPage] = useState(0)

    const handleNextPage = () => {
        if (page === pokemonsPaginated.length) return
        setPage(page + 1)
    }

    const handleBackPage = () => {
        if (page === 0) return
        setPage(page - 1)
    }

    useEffect(()=>{
        setPage(0)
    }, [pokemons])

    return (
        <div>

            <div className={style.list}>
                {pokemonsPaginated[page]?.map(pokemon => <PokemonCard key={pokemon.ID} pokemon={pokemon} />)}
            </div>

            <div>
                {page > 0 ? <button className='buttons' onClick={handleBackPage}>back</button> : <></>}
                {page < pokemonsPaginated.length - 1 ? <button className='buttons' onClick={handleNextPage}>next</button> : <></>}
            </div>
        </div>
    );
}

export default ListPokemons;
