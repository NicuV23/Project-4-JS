let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winningSquares = [];
let playerXScore = 0;
let playerOScore = 0;

/*all possible combinations */

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winningSquares = [a, b, c];
            return gameBoard[a];
        }
    }
    return null;
};

const handleClick = (index) => {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        render();
        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            highlightWinner();
            updateScore(winner);
            alert(`Player ${winner} has won!`);
        } else if (!gameBoard.includes('')) {
            gameActive = false;
            alert("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
};

const highlightWinner = () => {
    winningSquares.forEach((index) => {
        document.getElementById(`square-${index}`).classList.add('winning-square');
    });
};

const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    winningSquares = [];
    render();
};

const render = () => {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.id = `square-${i}`;
        square.textContent = gameBoard[i];
        square.onclick = () => handleClick(i);
        board.appendChild(square);
    }
};

const updateScore = (winner) => {
    if (winner === 'X') {
        playerXScore++;
    } else {
        playerOScore++;
    }
    document.getElementById('playerXScore').textContent = playerXScore;
    document.getElementById('playerOScore').textContent = playerOScore;
};

render();
