import { checkForOpponentShip } from "./MainGame";

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

function tileSequence(event) {
  const result = checkForOpponentShip(event);

  if (result === true) {
    event.target.classList.add("hit");
  } else {
    event.target.classList.add("miss");
  }

  event.target.removeEventListener("click", tileSequence);
}

function createGameBoardUIOpponent(playerString) {
  const board = document.getElementById(playerString + "-board");

  for (let i = 0;  i < 100; i++) {
    const tile = document.createElement("div");
    const num = i;
    tile.classList.add("cell");
    tile.id = playerString + "-" + num.toString();

    tile.addEventListener("click", tileSequence);

    board.appendChild(tile);
  }
}


function generateShipCellUI(shipSize, orientation) {
  const div = document.createElement('div');
  div.classList.add("ship-cell");

  if (orientation === "horizontal") {
    const width = (2.1875 * shipSize) + (0.125 * (shipSize - 1));
    div.style.width = width + 'rem';
    div.style.height = 2.1875 + 'rem';
  } else {
    const height = (2.1875 * shipSize) + (0.125 * (shipSize - 1));
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

export {createGameBoardUI, createGameBoardUIOpponent, placeShipOnGameBoardUI};