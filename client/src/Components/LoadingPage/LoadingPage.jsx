// STYLES
import style from './LoadingPage.module.css'

const LoadingPage = () => {
    return (
        <div className={style.container}>
            <img src="https://media.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif" alt="loading..." />
            <h2>Searching Pokemons ....</h2>
        </div>
    );
}

export default LoadingPage;
