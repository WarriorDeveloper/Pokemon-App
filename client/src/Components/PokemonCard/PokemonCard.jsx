// STYLES
import style from './PokemonCard.module.css'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setDetailPokemon } from '../../redux/actions/actions'

/**
 * 
 * @param { {pokemon: {
 * ID: number,
 * name: string,
 * image: string,
 * types: string[]
 * }} } pokemon 
 */
const PokemonCard = ({ pokemon }) => {
    const dispatch = useDispatch()
    const setDetailLink = () => {
        dispatch(setDetailPokemon(pokemon.ID))
    }
    return (

        <div className={style.colorsCard}>
            <Link to='/detail' onClick={setDetailLink} className={style.link}>
                <div className={style.container}>
                    <h2>{pokemon.name}</h2>
                    <div className={style.img}>
                        <img src={pokemon.image} alt={pokemon.image} width='200px' height='200px' />
                    </div>
                    <ul className={style.types}>
                        {pokemon.types.map((type, i) => <li key={i}>{type}</li>)}
                    </ul>
                </div>
            </Link>
        </div>

    );
}

export default PokemonCard;

/*
<div className={style.container}>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.image} alt={pokemon.image} width='200px' height='200px' />
                    <ul className={style.types}>
                        {pokemon.types.map((type, i) => <li key={i}>{type}</li>)}
                    </ul>
                </div>
*/