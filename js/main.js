/*
Keep track of which players turn
Switch images playeds based on current player
Game logic (if three buttons in a row match that player is the winner)
Give an alert for win or tie
*/

const letters = {
    'null': '',
    '1': 'X',
    '-1': 'O',
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

let boxes = document.querySelectorAll('div');
let message = document.querySelector('h1');

document.querySelector('section').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);

let board, turn, winner;

init();

function handleMove(evt) {
    var idx = parseInt(evt.target.id.replace('box', ''));
    if (board[idx] || winner) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}

function getWinner() {
    for (var i = 0; i < winningCombos.length; i++) {
        if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) ===3) return board[winningCombos[i][0]];
    }
    if (board.includes(null)) return null;
    return 'tie';
}

function render() {
    board.forEach(function(box, idx) {
        boxes[idx].innerHTML = letters[box];
    });
    if (winner === 'tie') {
        message.innerHTML = 'Tie game';
    } else if (winner) {
        message.innerHTML = `Congrats ${letters[winner]}`;
    } else {
        message.innerHTML = `${letters[turn]}'s turn`;
    }
}

function init() {
    board= [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
}