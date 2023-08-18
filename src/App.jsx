import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { checkWin } from './logic/board'
import { resetGameLocalStorage, saveGameLocalStorage } from './logic/storage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(()=> {
    const turnFromLocalStorage = localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // No se actualiza la celda si ya tiene una ficha
    if(board[index] || winner) return 
    // Actualizar en tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar aquí partida
    saveGameLocalStorage({board: newBoard, turn: newTurn})

    // Revisar si hay un ganador
    const newWinner = checkWin(newBoard)
    // Comprobamos si hay un ganador o si ha habido un empate
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (!newBoard.includes(null)) { // si no hay null en ninguna casilla es porque hay X u O en todas.
      setWinner(false)
    }   
  }

  const handlePlayAgain = ()  => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameLocalStorage()
  }

  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <button className='btnResetGame' onClick={handlePlayAgain}>Resetear</button>
      <section className="board">

        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} handlePlayAgain={handlePlayAgain}  />
    </main>
  )
}

export default App
