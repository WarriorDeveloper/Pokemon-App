import './App.css';

// PAGES
import LandingPage from './Pages/LandingPage/LandingPage'
import HomePage from './Pages/HomePage/HomePage'
import DetailPage from './Pages/DetailPage/DetailPage'
import FormPage from './Pages/FormPage/FormPage'

// ROUTER
import { Routes, Route } from 'react-router-dom'

// DEPLOY
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/'

const App = ()=>{
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/detail' element={<DetailPage/>} />
        <Route path='/form' element={<FormPage/>} />
      </Routes>
    </div>
  );
}

export default App;
