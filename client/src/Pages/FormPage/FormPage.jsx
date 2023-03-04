// STYLES
import style from './FormPage.module.css'

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { postPokemon } from '../../redux/actions/actions'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { validatorName, validatorStats, validatorPokemon } from './validators/validator';

const FormPage = () => {

    const status = useSelector(state => state.status)
    const types = useSelector(state => state.types)
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const [validatorForm, setValidatorForm] = useState({
        name: '',
        stats: ''
    })

    const [pokemon, setPokemon] = useState({
        name: '',
        image: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })

    const handleSavePokemon = (e) => {

        if (e.target.name === 'name') {
            if (validatorName(e.target.value) === false) setValidatorForm({
                ...validatorForm,
                name: 'numbers no or empty string'
            })
            else {
                setValidatorForm({
                    ...validatorForm,
                    name: ''
                })
            }
        }

        if (e.target.name !== 'name' && e.target.name !== 'image'){
            if (validatorStats(e.target.value) === false) setValidatorForm({
                ...validatorForm,
                stats: 'invalid number'
            })
            else {
                setValidatorForm({
                    ...validatorForm,
                    stats: ''
                })
            }
        }

        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        })

        if (!isNaN(Number(e.target.value)) && e.target.value !== '') {
            setPokemon({
                ...pokemon,
                [e.target.name]: Number(e.target.value)
            })
        } else {
            setPokemon({
                ...pokemon,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSaveCheck = (e) => {
        if (e.target.checked) {
            setPokemon({
                ...pokemon,
                types: [...pokemon.types, e.target.value]
            })
        } else {
            setPokemon({
                ...pokemon,
                types: pokemon.types.filter(type => type !== e.target.value)
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validatorForm.name && !validatorForm.stats) {
            dispatch(postPokemon(pokemon))
            setPokemon({
                name: '',
                image: '',
                hp: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                height: 0,
                weight: 0,
                types: []
            })
            if (status) navigator('/home')
        }
    }

    return (
        <div className={style.container}>
            <h1 className={style.title}>Create your Pokemon</h1>

            <form className={style.form} onSubmit={handleSubmit}>
                {!status && <h1>Missing Data</h1>}
                <label>Name: </label>
                <input onChange={handleSavePokemon} value={pokemon.name} type="text" name='name' />
                {validatorForm.name ? <p className={style.errors}>{validatorForm.name}</p> : <></>}
                <hr />

                <label>Image: </label>
                <input onChange={handleSavePokemon} value={pokemon.image} type="text" name='image' />
                <hr />

                <label>HP: </label>
                <input onChange={handleSavePokemon} value={pokemon.hp} type="number" name='hp' />
                <hr />

                <label>Attack: </label>
                <input onChange={handleSavePokemon} value={pokemon.attack} type="number" name='attack' />
                <hr />

                <label>Defense: </label>
                <input onChange={handleSavePokemon} value={pokemon.defense} type="number" name='defense' />
                <hr />

                <label>Speed: </label>
                <input onChange={handleSavePokemon} value={pokemon.speed} type="number" name='speed' />
                <hr />

                <label>Height: </label>
                <input onChange={handleSavePokemon} value={pokemon.height} type="number" name='height' />
                <hr />

                <label>Weight: </label>
                <input onChange={handleSavePokemon} value={pokemon.weight} type="number" name='weight' />
                <hr />

                {validatorForm.stats ? <p className={style.errors}>{validatorForm.stats}</p> : <></>}

                <label>Types: </label>
                <div className={style.types}>
                    {
                        types?.map((type) => {
                            return (
                                <div key={type.ID}>
                                    <input onChange={handleSaveCheck} type="checkbox" name="typesCheck" value={type.name} />
                                    <span>{type.name}</span>
                                </div>
                            )
                        })
                    }
                </div>

                
                { validatorPokemon(pokemon) && !validatorForm.name && !validatorForm.stats ? <button type="submit" className='buttons'>Send</button>:<></>}
            </form>
            <Link to='/home' className='buttons'>Home</Link>

        </div>
    );
}

export default FormPage;
