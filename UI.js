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

function createGameBoardUIOpponent(player) {
  const board = document.getElementById(player + "-board");

  for (let i = 0;  i < 100; i++) {
    const tile = document.createElement("div");
    const num = i;
    tile.classList.add("cell");
    tile.id = player + "-" + num.toString();

    tile.addEventListener("click", function(e){
      const result = checkForOpponentShip(e);

      //if there's a hit, mark the cell as a "hit", and the respective ship's spot as a "hit"
      if (result) {
        //mark cell as a hit
        tile.classList.add("hit");
        //mark ship on list of ships as a hit
      }

      //if it's a miss, mark the cell as a miss
      else {
        //mark the cell as a miss
        tile.classList.add("miss");
      }
    });

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