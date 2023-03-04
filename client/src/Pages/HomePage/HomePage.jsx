// STYLES
import styles from './HomePage.module.css'

import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokemons, clearAllPokemons, filterByTypes, ordering } from '../../redux/actions/actions'

// COMPONENTS
import LoadingPage from '../../Components/LoadingPage/LoadingPage'
import SearchBar from '../../Components/SearchBar/SearchBar'
import ListPokemons from '../../Components/ListPokemons/ListPokemons'

const HomePage = () => {

    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)
    const types = useSelector(state => state.types)

    useEffect(() => {
        dispatch(getAllPokemons())

        return () => dispatch(clearAllPokemons())
    }, [])

    const [orderingParams, setOrderingParams] = useState({
        ordering: '',
        criteria: ''
    })

    const handleFilterChange = (e) => {
        dispatch(filterByTypes(e.target.value))
    }

    const handleSetOrdering = (e) => {
        setOrderingParams({
            ...orderingParams,
            [e.target.id]: e.target.value
        })
    }

    const handleOrder = () => {
        dispatch(ordering(orderingParams))
    }

    return (
        <div className={styles.container}>
            <SearchBar />
            <div className={styles.filters}>
                <div className={styles.type}>
                    <h1>Filter</h1>
                    <select id="filterType" onChange={handleFilterChange}>
                        <option value="">default</option>
                        <option value="api">API</option>
                        <option value="db">DB</option>
                        {
                            types?.map(type => <option key={type.ID}>{type.name}</option>)
                        }
                    </select>
                </div>
                <div className={styles.criteria}>
                    <h1>Ordering</h1>
                    <h3>upward or falling</h3>
                    <select id="ordering" onChange={handleSetOrdering}>
                        <option value="">default</option>
                        <option value="upward">upward</option>
                        <option value="falling">falling</option>
                    </select>
                    <h3>criteria</h3>
                    <select id="criteria" onChange={handleSetOrdering}>
                        <option value="">default</option>
                        <option value="alphabetical">alphabetical</option>
                        <option value="attack">attack</option>
                    </select>
                    <button onClick={handleOrder}>Order</button>
                </div>
            </div>
            {
                pokemons.length === 0 ? <LoadingPage /> : <>
                    <h1 className={styles.title}>We found pokemons😁</h1>
                    <Link className='buttons' to='/form'>Form</Link>
                    <ListPokemons pokemons={pokemons} />
                </>
            }
        </div>
    );
}

export default HomePage;

/*

<SearchBar />
            <Link to='/form'>Form</Link>
            <h1>Home Page</h1>
            <h1>Filter</h1>
            <select id="filterType" onChange={handleFilterChange}>
                <option value="">normal</option>
                <option value="api">API</option>
                <option value="db">DB</option>
                {
                    types?.map(type => <option key={type.ID}>{type.name}</option>)
                }
            </select>
            <h1>Ordering</h1>
            <h3>upward or falling</h3>
            <select id="ordering" onChange={handleSetOrdering}>
                <option value="">normal</option>
                <option value="upward">upward</option>
                <option value="falling">falling</option>
            </select>
            <h3>criteria</h3>
            <select id="criteria" onChange={handleSetOrdering}>
                <option value="">normal</option>
                <option value="alphabetical">alphabetical</option>
                <option value="attack">attack</option>
            </select>
            <button onClick={handleOrder}>Order</button>
            <ListPokemons pokemons={pokemons} />

*/