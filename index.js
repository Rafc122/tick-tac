const crossChose = 'cross'
const circleChose = 'circle'
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('.cell')
const board = document.getElementById('board')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageText = document.getElementById('winningMessageText')
let turn
let currentSymbol

function setFigure() {
  board.classList.remove(crossChose)
  board.classList.remove(circleChose)
  if (turn) {
    board.classList.add(circleChose)
  } else {
    board.classList.add(crossChose)
  }
}

function startGame() {
  cellElements.forEach(cell => {
    cell.classList.remove(crossChose)
    cell.classList.remove(circleChose)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setFigure()
  winningMessage.classList.remove('show')
}

startGame()

function swapTurns() {
  turn = !turn
}

restartButton.addEventListener('click', startGame)


function placeMark(cell, currentSymbol) {
  cell.classList.add(currentSymbol)
}

function handleClick(e) {
  const cell = e.target
  console.log(e);
  if (turn) {
    currentSymbol = circleChose
  } else {
    currentSymbol = crossChose
  } 
  placeMark(cell, currentSymbol)
  if (checkWin(currentSymbol)) {
    endGame(false)
  } //else is (checkDraw()) {endGame(true)} 
    else {
    swapTurns()
    setFigure()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = 'DRAW!'
  } else {
    winningMessageText.innerText = 'VICTORY!'
  }
  winningMessage.classList.add('show')
}

// надо придумать вариант для ничьи.

function checkDraw() {

}


function checkWin(currentSymbol) {
  return winningCombination.some(function(combination)  {
    return combination.every(function(index) {
      return cellElements[index].classList.contains(currentSymbol)
    })
  })
}
