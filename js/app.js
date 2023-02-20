var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
];
var turn, winner, tie, board;
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = false;
    tie = false;
    console.log(turn);
}
init();
var squareEls = document.querySelectorAll('.sqr');
var messageEl = document.querySelector('#message');
var boardEl = document.querySelector('.board');
var resetBtnEl = document.querySelector('#reset-button');
boardEl === null || boardEl === void 0 ? void 0 : boardEl.addEventListener('click', handleClick);
resetBtnEl === null || resetBtnEl === void 0 ? void 0 : resetBtnEl.addEventListener('click', init);
squareEls.forEach(function (square) { return square.addEventListener("click", handleClick); });
if (resetBtnEl)
    resetBtnEl.addEventListener("click", init);
function render(evt) {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach(function (space, idx) {
        var choice = squareEls[idx];
        if (space === null) {
            choice.textContent = '';
            return;
        }
        resetBtnEl.removeAttribute('hidden');
        if (space == 1) {
            choice.textContent = 'X';
        }
        else if (space === -1) {
            choice.textContent = 'O';
        }
    });
}
function updateMessage() {
    if (turn === -1 && winner === null) {
        console.log(turn, winner);
        messageEl.textContent = 'Player X turn!';
    }
    else if (turn === 1 && winner === null) {
        messageEl.textContent = 'Player O turn!';
    }
    else if (winner === 't') {
        messageEl.textContent = "It's a Tie!";
    }
    else if (winner === 1) {
        messageEl.textContent = 'Congratulations X won!';
    }
    else if (winner === -1) {
        messageEl.textContent = 'Congratulations O won!';
    }
}
function handleClick(evt) {
    var sqIdx = parseInt(evt.target.id[2]);
    if (board[sqIdx]) {
        return;
    }
    board[sqIdx] = turn;
    turn = turn * -1;
    winner = null;
    placePiece(sqIdx);
    checkForWinner(sqIdx);
    render();
}
function placePiece(idx) {
    board[idx] = turn;
}
function checkForWinner() {
    var totals = [];
    winningCombos.forEach(function (combo) {
        console.log(combo);
        var sum = board[combo[0]] + board[combo[1]] + board[combo[2]];
        console.log(sum);
        totals.push(sum);
    });
    var xIsWinner = totals.some(function (x) { return x === 3; });
    console.log('X', xIsWinner);
    var oIsWinner = totals.some(function (o) { return o === -3; });
    console.log('O', oIsWinner);
    var isTie = board.some(function (square) { return square === null; });
    if (xIsWinner) {
        winner = 1;
    }
    else if (oIsWinner) {
        winner = -1;
    }
    else {
        if (isTie === false) {
            winner = 't';
        }
    }
    render();
}
