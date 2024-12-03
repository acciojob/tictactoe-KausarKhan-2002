//your JS code here. If required.

document.getElementById("submit").addEventListener("click", startGame);

function startGame() {
  const player1 = document.getElementById("player-1").value.trim();
  const player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  document.querySelector(".input-section").style.display = "none";
  document.querySelector(".game-section").style.display = "block";

  let currentPlayer = player1;
  const messageDiv = document.querySelector(".message");
  messageDiv.textContent = `${currentPlayer}, you're up`;

  const board = Array(9).fill(null);

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const id = parseInt(cell.id) - 1;

      if (board[id] !== null || checkWinner(board)) return;

      board[id] = currentPlayer === player1 ? "X" : "O";
      cell.textContent = board[id];

      if (checkWinner(board)) {
        messageDiv.textContent = `${currentPlayer} congratulations you won!`;
        cells.forEach((cell) => cell.style.pointerEvents = "none");
        return;
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;
      messageDiv.textContent = `${currentPlayer}, you're up`;
    });
  });
}

function checkWinner(board) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
		board[a].style.background = "red"
      return true;
    }
  }
  return false;
}
