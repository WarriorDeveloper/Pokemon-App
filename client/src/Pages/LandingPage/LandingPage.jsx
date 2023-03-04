// STYLES
import styles from './LandingPage.module.css'

import { Link } from "react-router-dom"

const LandingPage = ()=>{
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Pokemon App</h1>
            <Link className='buttons' to='/home'>Home</Link>
        </div>
    )
}

export default LandingPage