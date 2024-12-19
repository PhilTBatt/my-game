import { useEffect } from 'react'
import './App.css'
import game from './phaser'

function App() {

  useEffect(() => {
    const container = document.getElementById('game-container')
    const canvas = document.querySelector('canvas')

    if (canvas && container && canvas.parentNode !== container) {
      container.appendChild(canvas) // Ensure the canvas is inside the container
    }
    
    return () => game.destroy(true)
  }, [])

  return (
    <div id="game-container"/>
  )
}

export default App
