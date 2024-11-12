//your JS code here. If required.

let message = document.querySelector(".message");
let boxes = document.querySelectorAll(".box");
let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");
let startGame = document.getElementById("submit")
let playersName = document.querySelector(".playersName");
let boxContainer = document.querySelector(".box_container");

// All possible winner patterns in 2d Array.
let patterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 1, 0],
  [2, 5, 8],
  [2, 4, 6],
  [2, 4, 5],
  [5, 4, 3],
  [6, 7, 8],
  [6, 3, 0],
  [6, 4, 2],
  [7, 4, 1],
  [8, 7, 6],
  [8, 5, 2],
  [8, 4, 0],
];

// Show the turn of player according to given the values of x or y.
let turn = true;

// Declare player name globally so that specifically player name could be render anywhere.
let player1Name
let player2Name

// Click button to start the game by player name
startGame.addEventListener("click", () => {
  console.log(player1.value + " " + player2.value);
  player1Name = player1.value;
  player2Name = player2.value;

  message.firstElementChild.innerHTML = `${player1Name}, you're up`;
  message.lastElementChild.innerHTML = `${player2Name}, you're up`;
  message.lastElementChild.style.display = "none";

  if (player1.value != "" && player2.value != "") {
    playersName.style.display = "none";
    boxContainer.style.display = "block";
  } else {
    alert("Please fill player name");
  }

});

// Show the turn of player name.
const playerTurn = (turn) => {
  if (turn) {
    message.firstElementChild.style.display = "block";
    message.lastElementChild.style.display = "none";
  } else {
    message.firstElementChild.style.display = "none";
    message.lastElementChild.style.display = "block";
  }
};


// Match the pattern to make winner between player1 and player2.
const winner = () => {
  let win = false;
  patterns.forEach((pattern) => {
    let pattern1 = boxes[pattern[0]];
    let pattern2 = boxes[pattern[1]];
    let pattern3 = boxes[pattern[2]];

    if (pattern1.innerText && pattern2.innerText && pattern3.innerText) {
      if (
        pattern1.innerText == pattern2.innerText &&
        pattern2.innerText == pattern3.innerText
      ) {
        boxes.forEach((box) => {
          box.disabled = true;

          if (pattern1.innerText == "x") {
            message.firstElementChild.innerText = `${player1Name} congratulations you won!`;
          } else {
            message.lastElementChild.innerText = `${player2Name} congratulations you won!`;
          }

          pattern1.style.color = "green";
          pattern2.style.color = "green";
          pattern3.style.color = "green";
          win = true;
        });
      }
    }
  });

  if (win) return true;
  else return false;
};


// Main root where every box is unpacked one by one.
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerHTML = "x";
      turn = false;
      box.style.color = "cornflowerblue";
    } else {
      box.innerHTML = "o";
      turn = true;
    }

    let win = winner();
    console.log(win);

    if (win == false) playerTurn(turn);
  });
});
