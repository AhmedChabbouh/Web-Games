import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BoardProvider from './BoardContext.jsx'
import Game from './Game.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BoardProvider>
    <Game />
  </BoardProvider>
  </StrictMode>
)
