//your JS code here. If required.

let currentPlayer = 'x';
let player1 = '';
let player2 = '';

document.getElementById('submit').addEventListener('click', function () {
    // Get player names
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    // Ensure both names are provided
    if (player1 && player2) {
        // Hide the player input form and show the game board
        document.getElementById('player-input').style.display = 'none';
        document.getElementById('game-board').style.display = 'flex';

        // Display the turn message for the first player
        document.getElementById('message').textContent = `${player1}, you're up`;
    } else {
        alert("Please enter names for both players.");
    }
});

// Add event listeners to each cell
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cell = e.target;

    // Check if the cell is already occupied
    if (cell.textContent !== '') {
        return;
    }

    // Mark the cell with the current player's symbol
    cell.textContent = currentPlayer;

    // Check for a win or tie
    if (checkWin()) {
        document.getElementById('message').textContent = `${currentPlayer === 'x' ? player1 : player2}, congratulations you won!`;
        disableBoard();
    } else if (checkTie()) {
        document.getElementById('message').textContent = "It's a tie!";
    } else {
        // Switch players and update the turn message
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        document.getElementById('message').textContent = `${currentPlayer === 'x' ? player1 : player2}, you're up`;
    }
}

function checkWin() {
    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];
    
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return document.getElementById(index).textContent === currentPlayer;
        });
    });
}

function checkTie() {
    return Array.from(document.querySelectorAll('.cell')).every(cell => cell.textContent !== '');
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
}
