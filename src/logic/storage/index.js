export const saveGameLocalStorage = ({board, turn}) => {
  localStorage.setItem('board', JSON.stringify(board))
  localStorage.setItem('turn', turn)
}

export const resetGameLocalStorage = () => {
  localStorage.removeItem('board')
  localStorage.removeItem('turn')
}