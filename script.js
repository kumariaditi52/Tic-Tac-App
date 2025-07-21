const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.textContent = "";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  message.textContent = "";
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "X" : "O";
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.textContent = currentClass;
  cell.classList.add(currentClass.toLowerCase());
}

function swapTurns() {
  isXTurn = !isXTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === "X" || cell.textContent === "O";
  });
}

function endGame(draw, winner = "") {
  if (draw) {
    message.textContent = "It's a draw!";
    alert("It's a draw! Try again.");
  } else {
    const loser = winner === "X" ? "O" : "X";
    message.textContent = `${winner} wins! ${loser} loses!`;
    alert(`${winner} wins the game! ${loser} loses.`);
  }

  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}
