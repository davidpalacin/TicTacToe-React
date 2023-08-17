import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'X',
  O: 'O'
}

const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `cell ${ isSelected ? 'is-selected' : '' }`;

  const handleClick = () => {
    updateBoard(index)
  }
  
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = (index) => {
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    turn === TURNS.X ? setTurn(TURNS.O) : setTurn(TURNS.X)
  }

  return (
    <main>
      <h3>Tic Tac Toe</h3>
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

    </main>
  )
}

export default App
