const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O' 
    },
];

const playerConfigOverlay = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorOutput = document.getElementById('config-error');
const gameArea = document.getElementById('active-game');
const activePlayerName = document.getElementById('active-player-name');
const gameOver = document.getElementById('game-over');

const editPlayer1 = document.getElementById('edit1');
const editPlayer2 = document.getElementById('edit2');

const cancelButton = document.getElementById('cancel-config');
const startButton = document.getElementById('start-game'); 
//const gameFields = document.querySelectorAll('#game-board li');
const gameBoard = document.getElementById('game-board');

editPlayer1.addEventListener('click', openPlayerConfig);
editPlayer2.addEventListener('click', openPlayerConfig);

cancelButton.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startButton.addEventListener('click', startNewGame);

//for(const gameField of gameFields){
//    gameField.addEventListener('click', selectGameField);
//}

gameBoard.addEventListener('click', selectGameField);