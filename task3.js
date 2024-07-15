document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('#board');
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('#status');
    const restartButton = document.querySelector('#restart');
    const playAIButton = document.querySelector('#playAI');

    let isXTurn = true;
    let gameActive = true;
    let againstAI = false;
    let gameState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute('data-index'));

        if (gameState[index] || !gameActive) return;

        gameState[index] = isXTurn ? 'X' : 'O';
        cell.textContent = gameState[index];

        if (checkWin()) {
            status.textContent = `${gameState[index]} wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes(null)) {
            status.textContent = `It's a draw!`;
            gameActive = false;
            return;
        }

        isXTurn = !isXTurn;

        if (againstAI && !isXTurn) {
            aiMove();
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function aiMove() {
        const emptyIndices = gameState.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        gameState[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';

        if (checkWin()) {
            status.textContent = `O wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes(null)) {
            status.textContent = `It's a draw!`;
            gameActive = false;
            return;
        }

        isXTurn = !isXTurn;
    }

    function restartGame() {
        isXTurn = true;
        gameActive = true;
        gameState = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        status.textContent = '';
    }

    function startAgainstAI() {
        restartGame();
        againstAI = true;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    playAIButton.addEventListener('click', startAgainstAI);
});
