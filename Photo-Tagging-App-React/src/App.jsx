// IMPORTS 
// Styles
import './App.css'
// React 
import { useState, useEffect } from 'react'

// RRD 

// Pages
import { Homepage } from './Pages/Homepage'
import { Gamepage } from './Pages/Gamepage'
import { LoadingGamepage } from './Pages/LoadingGamepage'
import { Gameoverpage } from './Pages/Gameoverpage'

// Components

// COMPONENT

function App() {

  // STATES 
  const [gameState, setGameState] = useState('Homepage')



  return (
    <div className='App'>
      {gameState === "Homepage" && <Homepage setGameState={setGameState}/> }
      {gameState === "Gamepage" && <Gamepage setGameState={setGameState}/> }
      {gameState === "Loading" && <LoadingGamepage setGameState={setGameState}/> }
      {gameState === "Gameover" && <Gameoverpage setGameState={setGameState}/> }

      
      </div>
  )
}

export default App
