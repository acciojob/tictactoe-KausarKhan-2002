//your JS code here. If required.

// DOM Elements
const nameScreen = document.getElementById('nameScreen');
const gameScreen = document.getElementById('gameScreen');
const message = document.getElementById('message');
const cells = document.querySelectorAll('.cell');
const submitButton = document.getElementById('submit');

let player1 = '';
let player2 = '';
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

// Helper function to switch turns
function switchTurn() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `${currentPlayer === 'X' ? player1 : player2}, you're up!`;
}

// Check for winning conditions
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Handle cell click
function handleCellClick(e) {
  const cellIndex = parseInt(e.target.id) - 1;

  if (board[cellIndex] || !gameActive) return;

  board[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    message.textContent = `${winner === 'X' ? player1 : player2}, congratulations, you won!`;
    gameActive = false;
  } else if (!board.includes(null)) {
    message.textContent = "It's a tie!";
    gameActive = false;
  } else {
    switchTurn();
  }
}

// Initialize game on name submission
submitButton.addEventListener('click', () => {
  player1 = document.getElementById('player-1').value || 'Player 1';
  player2 = document.getElementById('player-2').value || 'Player 2';

  if (player1 && player2) {
    nameScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    message.textContent = `${player1}, you're up!`;
  }
});

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
