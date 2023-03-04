// STYLES
import style from './DetailPage.module.css'


import { useSelector, useDispatch } from 'react-redux'
import { clearDetailPokemon } from '../../redux/actions/actions'
import { useEffect } from 'react'

import { Link } from 'react-router-dom'

const DetailPage = () => {
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.detailPokemon)

    useEffect(() => {
        return () => dispatch(clearDetailPokemon())
    }, [])

    return (
        <div className={style.container}>
            <div className={style.titles}>
                <h1>ID: {pokemon.ID}</h1>
                <h1>POKEMON: {pokemon.name}</h1>
            </div>
            <div className={style.imageCard}>
                <img className={style.img} src={pokemon.image} alt={pokemon.image} />
            </div>
            <ul className={style.types}>
                {pokemon.types?.map((type, index) => <li key={index}>{type}</li>)}
            </ul>

            <div className={style.info}>
                <h3>HP: {pokemon.hp}</h3>
                <h3>ATTACK: {pokemon.attack}</h3>
                <h3>DEFENSE: {pokemon.defense}</h3>
                <h3>SPEED: {pokemon.speed}</h3>
                <h3>HEIGHT: {pokemon.height}</h3>
                <h3>WEIGHT: {pokemon.weight}</h3>
            </div>

            <div className={style.button}>
                <Link className='buttons' to='/home'>Home</Link>
            </div>
        </div>
    );
}

export default DetailPage;
