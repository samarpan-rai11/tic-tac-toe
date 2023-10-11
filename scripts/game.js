function resetGameStatus(){
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOver.firstElementChild.innerHTML = 
    'You WON, <span id="winner-name">PLAYERNAME</span>';
    gameOver.style.display = 'none';

    let gameBoardIndex = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameData[i][j] = 0;
            const gameBoardItem = gameBoard.children[gameBoardIndex];
            gameBoardItem.textContent = '';
            gameBoardItem.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame(){
    if(players[0].name === '' || players[0].name === ''){
        alert("Please set players names for both players");
        return;
    }

    resetGameStatus();

    activePlayerName.textContent = players[activePlayer].name;
    gameArea.style.display = 'block';
}

function switchPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    }
    else{
        activePlayer = 0;
    }
    activePlayerName.textContent = players[activePlayer].name;
    
}

function selectGameField(event){
    if(event.target.tagName !== 'LI' || gameIsOver){
        return;
    }

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0){
        alert("Please select an empty field.");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');
 
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    
    const winnerID = checkforGameOver();
    
    if(winnerID !== 0){
        endGame(winnerID);
    }

    currentRound++;
    switchPlayer();
}

function checkforGameOver(){
    //Checking the rows for equality
    for(let i = 0;i < 3;i++){
        if(gameData[i][0] > 0 && 
           gameData[i][0] == gameData[i][1] && 
           gameData[i][0] == gameData[i][2]){
            return gameData[i][0];
        }
    }

    //Checking the columns  for equality
    for(let i = 0;i < 3;i++){
        if(gameData[0][i] > 0 && 
           gameData[0][i] == gameData[1][i] && 
           gameData[0][i] == gameData[2][i]){
            return gameData[0][i];
        }
    }

    //Checking the diagonals
    if(gameData[0][0] > 0 && 
       gameData[0][0] == gameData[1][1] && 
       gameData[0][0] == gameData[2][2]){
            return gameData[0][0];
    }
    if(gameData[0][2] > 0 && 
        gameData[0][2] == gameData[1][1] && 
        gameData[0][2] == gameData[2][0]){
             return gameData[0][2];
     }

    if(currentRound === 9){
        return -1;
    }

    return 0;
}

function endGame(winnerID){
    gameIsOver = true;
    gameOver.style.display = 'block';

    if(winnerID > 0){
        const winnerName = players[winnerID - 1].name;
        gameOver.firstElementChild.firstElementChild.textContent = winnerName;
    }
    else{
        gameOver.firstElementChild.textContent = 'It\'s a draw!';
    }
}
