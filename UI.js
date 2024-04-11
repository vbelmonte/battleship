function createGameBoard(player) {
  const board = document.getElementById(player + "-board");

  for (let i = 0;  i < 100; i++) {
    const tile = document.createElement("div");
    const num = i;
    tile.classList.add("cell");
    tile.id = player + "-" + num.toString();

    board.appendChild(tile);
  }
}

function createShipPlacementContainer(x, y, shipLength, orientation) {
  const div = document.createElement('div');
  div.classList.add("ship", "ship-span");

  if (orientation === "horizontal") {
    div.style.gridTemplateColumns = 'repeat(' + shipLength + ', 1fr)';
    div.style.gridColumn = (x + 1) + ' / span ' + shipLength;
  } else {
    div.style.gridTemplateRows = 'repeat(' + shipLength + ', 1fr)';
    div.style.gridColumn = (x + 1);
    div.style.gridRow = (y + 1) + ' / span ' + shipLength;
  }

  return div;
}

function wrapShipCells(x, y, shipLength, shipCells, orientation) {
  const div = createShipPlacementContainer(x, y, shipLength, orientation);

  for (let i = 0; i < shipCells.length; i+=1) {
    div.appendChild(shipCells[i]);
  }

  return div;
}

function placeShipOnGameBoardUI(x, y, ship, orientation, player) {
  const board = document.getElementById(player + "-board");
  const shipCells = [];
  const shipLength = ship.getShipLength();

  if (orientation === "horizontal") {
    const startPoint = x + (10 * y);
    const endPoint = shipLength + startPoint;

    for (let i = startPoint; i < endPoint; i+=1) {
      board.childNodes[i + 1].classList.add("ship-cell");
      shipCells.push(board.childNodes[i + 1]);
    }

    const shipDiv = wrapShipCells(x, y, shipLength, shipCells, orientation);
    const nextCell = document.getElementById(player + "-" + endPoint);

    board.insertBefore(shipDiv, nextCell);

  } else {
    const range = shipLength;
    const startPoint = x + (10 * y);
    const endPoint = startPoint + 1;

    for (let i = 0; i < range; i+=1) {
      board.childNodes[startPoint + 1 + (10 * i)].classList.add("ship-cell");
      shipCells.push(board.childNodes[startPoint + 1 + (10 * i)]);
    }

    const shipDiv = wrapShipCells(x, y, shipLength, shipCells, orientation);
    const nextCell = document.getElementById(player + "-" + endPoint);

    board.insertBefore(shipDiv, nextCell);
  }
}

export {createGameBoard, placeShipOnGameBoardUI};