/*-------------------------------- Constants --------------------------------*/
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
/*---------------------------- Variables (state) ----------------------------*/
var board, turn, winner, tie;
/*------------------------ Cached Element References ------------------------*/
var messgaeEl = document.getElementById('message');
var squareEls = document.querySelectorAll(".sqr");
var boardEl = document.querySelector('.board');
var resetBtn = document.querySelector('.reset-btn');
/*----------------------------- Event Listeners -----------------------------*/
boardEl === null || boardEl === void 0 ? void 0 : boardEl.addEventListener('click', handleClick);
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
init();
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = -1;
    winner = false;
    tie = false;
    console.log(turn);
}
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach(function (square, idx) {
        if (square === 1)
            squareEls[idx].textContent = 'X';
        else if (square === -1)
            squareEls[idx].textContent = 'O';
        else
            squareEls[idx].textContent = '';
    });
}
function updateMessage() {
    if (!winner && !tie) {
        messgaeEl.textContent = "It's Player ".concat(turn === 1 ? 'X' : 'O', " turn");
    }
    else if (!winner && tie) {
        messgaeEl.textContent = "The game is a tie!";
    }
    else {
        messgaeEl.textContent = "Congrats! Player ".concat(turn === -1 ? 'O' : 'X', " wins!");
    }
}
function handleClick(evt) {
    if (!(evt.target instanceof HTMLElement))
        return;
    var sqIdx = parseInt(evt.target.id.slice(2, 3), 10);
    if (isNaN(sqIdx) || board[sqIdx] || winner)
        return;
    placePiece(sqIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}
function checkForTie() {
    tie = board.every(function (sqr) {
        return sqr !== 0;
    });
}
function placePiece(idx) {
    board[idx] = turn;
}
function checkForWinner() {
    winningCombos.forEach(function (arr) {
        var winning = 0;
        arr.forEach(function (el) {
            winning += board[el] || 0;
        });
        if (Math.abs(winning) === 3) {
            winner = true;
        }
    });
}
function switchPlayerTurn() {
    if (winner === true) {
        return;
    }
    else {
        turn *= -1;
    }
}
