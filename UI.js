function createGameBoardUI(player) {
  const board = document.getElementById(player + "-board");

  for (let i = 0;  i < 100; i++) {
    const tile = document.createElement("div");
    const num = i;
    tile.classList.add("cell");
    tile.id = player + "-" + num.toString();

    board.appendChild(tile);
  }
}


function generateShipCellUI(shipSize, orientation) {
  const div = document.createElement('div');
  div.classList.add("ship-cell");

  if (orientation === "horizontal") {
    const width = 2.275 * shipSize;
    div.style.width = width + 'rem';
    div.style.height = 2.2 + 'rem';
  } else {
    const height = 2.275 * shipSize;
    div.style.height = height + 'rem';
  }

  div.style.outline = 'solid 2px var(--blue)';

  return div;
}


function placeShipOnGameBoardUI(x, y, ship, orientation, player) {
  const shipLength = ship.getShipLength();

  const shipCell = generateShipCellUI(shipLength, orientation);

  const cellNum = (y * 10) + x;
  const shipContainer = document.getElementById(player + "-" + cellNum);
  shipContainer.appendChild(shipCell);
}

export {createGameBoardUI, placeShipOnGameBoardUI};