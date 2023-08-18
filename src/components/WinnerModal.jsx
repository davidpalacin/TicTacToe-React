import { Square } from "./Square";

export function WinnerModal({winner, handlePlayAgain}) {
  if (winner === null) return null
  const winnerText = winner === false ? 'Empate' : 'Victoria'
  return (

          <section className='winner'>
            <div className="text">
              <h2>
                {winnerText}
              </h2>

              {
                winner === false
                ? ''
                : (
                  <header className="win">
                    <Square>{winner}</Square>
                  </header>

                )
              }
              

              <footer>
                <button onClick={handlePlayAgain} className='btnPlayAgain'>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }