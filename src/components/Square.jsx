export const Square = ({ children, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard(index)
  }
  
  return (
    <div onClick={handleClick} className='cell'>
      {children}
    </div>
  )
}