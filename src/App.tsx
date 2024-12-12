import { useEffect } from 'react'
import './App.css'
import game from './phaser'

function App() {

  useEffect(() => {
    return () => game.destroy(true)
  }, [])

  return (
    <div id="game-container"/>
  )
}

export default App
