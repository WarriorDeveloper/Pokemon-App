// STYLES
import style from './SearchBar.module.css'

import { useState } from "react"

import { useDispatch, useSelector } from 'react-redux'
import { getNamePokemon, getAllPokemons } from "../../redux/actions/actions"

const SearchBar = () => {

    const status = useSelector(state => state.status)

    const [nameSearch, setNameSearch] = useState('')

    const dispatch = useDispatch()

    const handleChangeName = (e)=>{
        setNameSearch(e.target.value)
    }

    const handleSendName = ()=>{
        if (nameSearch === '') dispatch(getAllPokemons())
        dispatch(getNamePokemon(nameSearch))
    }

    return (
        <div className={style.container}>
            <input className={style.input} type="text" id="inputSearch" onChange={handleChangeName}/>
            <div className='buttons' onClick={handleSendName}>Search</div>
            {!status ? <>Pokemon no encontrado</> : <></>}
        </div>
    );
}

export default SearchBar;
