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
let turn: number, winner: boolean, tie: boolean, board: (number| null) []




/*------------------------ Cached Element References ------------------------*/


const squareEls: NodeListOf<Element> = document.querySelectorAll('.sqr');
const messageEl: HTMLElement | null = document.querySelector('#message');
const boardEl: HTMLElement | null = document.querySelector('.board');
const resetBtnEl: HTMLButtonElement | null = document.querySelector(".reset-button");



boardEl?.addEventListener('click', handleClick);
resetBtnEl?.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/

init()

function init(): void {
board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
turn = 1
winner = false
  tie = false
  console.log(turn)
}
function render(): void {
  updateBoard();
  updateMessage();
}

squareEls.forEach(square => square.addEventListener("click", (handleClick as (evt: Event) => void)));



if (resetBtnEl) resetBtnEl.addEventListener("click", init);



function updateBoard(): void {
  board.forEach((space, idx) => {
    const choice = squareEls[idx] as HTMLElement;
    if (space === null) {
      choice.textContent = '';
      return;
    }
    resetBtnEl.removeAttribute('hidden');
    if (space == 1) {
      choice.textContent = 'X';
    } else if (space === -1) {
      choice.textContent = 'O';
    }
  });
}

function updateMessage(): void {
  if (turn === -1 && winner === null) {
    console.log(turn, winner)
    messageEl.textContent = 'Player X turn!';
  } else if (turn === 1 && winner === null) {
    messageEl.textContent = 'Player O turn!';
  } else if (winner === 't') {
    messageEl.textContent = "It's a Tie!";
  } else if (winner === 1) {
    messageEl.textContent = 'Congratulations X won!';
  } else if (winner === -1) {
    messageEl.textContent = 'Congratulations O won!';
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
