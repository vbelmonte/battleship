function createGameBoard(player) {
  const board = document.getElementById(player + "-board");

  for (let i = 0;  i < 100; i++) {
    const tile = document.createElement("div");
    tile.classList.add("cell");

    board.appendChild(tile);
  }
}

export {createGameBoard};