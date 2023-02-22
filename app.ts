/*-------------------------------- Constants --------------------------------*/
const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8], 
  [1, 4, 7],
  [2, 5, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/
let board: number[], turn: number, winner: boolean, tie: boolean





/*------------------------ Cached Element References ------------------------*/


const messgaeEl = document.getElementById('message')!
const squareEls = document.querySelectorAll(".sqr");
const boardEl = document.querySelector<HTMLElement>('.board')!
const resetBtn = document.querySelector<HTMLButtonElement>('.reset-btn');


/*----------------------------- Event Listeners -----------------------------*/


boardEl?.addEventListener('click', handleClick);
resetBtn?.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
init()

function init(): void {
board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
turn = -1
winner = false
  tie = false
  console.log(turn)
}
function render(): void {
  updateBoard();
  updateMessage();
}


function updateBoard(): void {
  board.forEach((square, idx) => {
    if (square === 1) squareEls[idx].textContent = 'X'
    else if (square === -1) squareEls[idx].textContent = 'O'
    else squareEls[idx].textContent = ''
  })
}

function updateMessage(): void {
  if (!winner && !tie) {
    messgaeEl.textContent = `It Is Currently Player ${turn === 1 ? 'X' : 'O'} turn`
  } else if (!winner && tie) {
    messgaeEl.textContent = "The game is a tie!"
  } else {
    messgaeEl.textContent = `Congrats! Player ${turn === -1 ? 'O' : 'X'} wins!`
  }
}

function handleClick(evt: MouseEvent): void {
  if (!(evt.target instanceof HTMLElement)) return

  const sqIdx = parseInt(evt.target.id.slice(2, 3), 10)

  if (isNaN(sqIdx) || board[sqIdx] || winner) return

  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}


function checkForTie(): void {
  tie = board.every(sqr => {
    return sqr !== 0
  })
}

function placePiece(idx: number): void {
  board[idx] = turn;
}

function checkForWinner(): void {
  winningCombos.forEach(function(arr: number[]): void {
    let winning = 0;
    arr.forEach(function(el: number): void {
      winning += board[el] || 0;
    });
    if (Math.abs(winning) === 3) {
      winner = true;
    }
  });
}

function switchPlayerTurn(): void {
  if (winner === true) {
    return
  } else {
    turn *= -1
  }
}