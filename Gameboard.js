import ship from "./Ship";

function generateGrid() {
  let grid = [];
  for (let i = 0; i < 10; i+=1) {
    grid[i] = [];
    for (let j = 0; j < 10; j+=1) {
      grid[i][j] = null;
    }
  }

  return grid;
}

export default function Gameboard() {
  let grid = generateGrid();
  let sunkShips = [];

  const getGrid = () => {
    return grid;
  }

  const determineSink = (ship) => {
    if (ship.isSunk()) {
      sunkShips.push(ship);
    }
  }

  const checkAllShipsSunk = () => {
    if (sunkShips.length === 10) {
      return true;
    } else {
      return false;
    }
  }
  
  const placeShip = (x, y, shipSize, orientation) => {
    const battleship = ship(shipSize);

    if (orientation === "horizontal") {
      let range = shipSize + y;
      for (let i = x; i < range; i+=1) {
        grid[i][y] = battleship;
      }
    } else {
      let range = shipSize + y;
      for (let i = y; i < range; i+=1) {
        grid[x][i] = battleship;
      }
    }
  }

  const receiveAttack = (x, y) => {
    if (grid[x][y] !== null) {
      let ship = grid[x][y];
      ship.hit();
      determineSink(ship);
    } else {
      grid[x][y] = "miss";
    }
  }

  const getSunkShips = () => {
    return sunkShips;
  }

  return {getGrid, placeShip, receiveAttack, getSunkShips, checkAllShipsSunk};
}