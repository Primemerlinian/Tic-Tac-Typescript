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
  const sqIdx: number = parseInt((evt.target as HTMLElement).id[2]);
  if (board[sqIdx]) {
    return;
  }
  board[sqIdx] = turn;
  turn = turn * -1;
  winner = null;
  placePiece(sqIdx);
  checkForWinner(sqIdx);

  if (winner === null) {
    // Only check for tie if there is no winner
    let isTie = board.every(square => square !== 0);
    if (isTie) {
      winner = 't';
    }
  }

  render();
}


function placePiece(idx: number): void {
  board[idx] = turn;
}

function checkForWinner(): void {
  let totals: number[] = [];

  winningCombos.forEach(combo => {
    console.log(combo);
    const sum = board[combo[0]] + board[combo[1]] + board[combo[2]];
    console.log(sum);
    totals.push(sum);
  });

  let xIsWinner = totals.some(x => x === 3);
  console.log('X', xIsWinner);

  let oIsWinner = totals.some(o => o === -3);
  console.log('O', oIsWinner);

  let isTie = board.every(square => square !== 0);


  if (xIsWinner) {
    winner = 1;
  } else if (oIsWinner) {
    winner = -1;
  } else {
    if (isTie === false) {
      winner = 't';
    }
  }

  render();
}
