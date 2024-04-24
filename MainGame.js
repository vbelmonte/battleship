import player from "./Player";
import ship from "./Ship";
import { createGameBoardUI, createGameBoardUIOpponent, placeShipOnGameBoardUI } from "./UI";

const player1 = new player();
const computer = new player();

const p1_gameBoard = player1.getGameBoard();
const c_gameBoard = computer.getGameBoard();

function convertCellToGridCoordinates(element) {
  const array = element.split('-');
  const num = array[1];

  const x = num % 10;
  const y = Math.floor(num/10);

  return [x, y];
}

function checkForOpponentShip(e) {
  const array = convertCellToGridCoordinates(e.target.id);
  const x = array[0];
  const y = array[1];

  const result = c_gameBoard.receiveAttack(x, y);

  if (result === true) {
    console.log("hit!");
    return true;
  } else {
    console.log("miss!");
    return false;
  }
}

function verifyShipPlacementSize(x, y, shipLength, orientation) {
  if (orientation === "horizontal") {
    if ((shipLength + x) < 10) {
      return true;
    }

    return false;
  } else {
    if (shipLength + y < 10) {
      return true;
    }

    return false;
  }
}

function verifyShipPlacementVacant(x, y, shipLength, orientation, gameBoard) {
  if (orientation === "horizontal") {
    let i = x;
    while (i < x + shipLength) {
      if (gameBoard.getGrid()[y][i] !== null) {
        return false;
      }
      i++;
    }
    return true;

  } else {
    let i = y;
    while (i < y + shipLength) {
      if (gameBoard.getGrid()[i][x] !== null || gameBoard.getGrid()[i][x] === undefined) {
        return false;
      }
      i++;
    }
    return true;
  }
}

function randomizeShipPlacement(ships, gameBoard, player) {
  const orientations = ["horizontal", "vertical"];

  let i = 0;

  while (i < ships.length) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const orientation = orientations[Math.floor(Math.random() * 2)];
    const placementSize = verifyShipPlacementSize(x, y, ships[i].getShipLength(), orientation);

    if (placementSize) {
      const placementVacant = verifyShipPlacementVacant(x, y, ships[i].getShipLength(), orientation, gameBoard);
      if (placementVacant) {
        gameBoard.placeShip(x, y, ships[i], orientation);
        placeShipOnGameBoardUI(x, y, ships[i], orientation, player);
        i++;
      }
    }
  }
  console.log(gameBoard.getGrid());
}

function randomizeShipPlacementOpponent(ships, gameBoard, player) {
  const orientations = ["horizontal", "vertical"];

  let i = 0;

  while (i < ships.length) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const orientation = orientations[Math.floor(Math.random() * 2)];
    const placementSize = verifyShipPlacementSize(x, y, ships[i].getShipLength(), orientation);

    if (placementSize) {
      const placementVacant = verifyShipPlacementVacant(x, y, ships[i].getShipLength(), orientation, gameBoard);
      if (placementVacant) {
        gameBoard.placeShip(x, y, ships[i], orientation);
        i++;
      }
    }
  }
}

function placeShips(p1_gameBoard, c_gameBoard) {
  const p1_carrier = new ship(5);
  const p1_battleship = new ship(4);
  const p1_cruiser = new ship(3);
  const p1_submarine = new ship(3);
  const p1_destroyer = new ship(2);

  const p1_ships = [
    p1_carrier,
    p1_battleship,
    p1_cruiser,
    p1_submarine,
    p1_destroyer
  ];

  randomizeShipPlacement(p1_ships, p1_gameBoard, "p1");

  const c_carrier = new ship(5);
  const c_battleship = new ship(4);
  const c_cruiser = new ship(3);
  const c_submarine = new ship(3);
  const c_destroyer = new ship(2);

  const c_ships = [
    c_carrier,
    c_battleship,
    c_cruiser,
    c_submarine,
    c_destroyer
  ];

  randomizeShipPlacementOpponent(c_ships, c_gameBoard, "computer");
}

function determineTurn() {
  const result = Math.floor(Math.random() * 2) + 1;
  return result;
}

function MainGame() {
  /*const player1 = new player();
  const computer = new player();

  const p1_gameBoard = player1.getGameBoard();
  const c_gameBoard = computer.getGameBoard();*/

  createGameBoardUIOpponent("computer");
  createGameBoardUI("p1");

  placeShips(p1_gameBoard, c_gameBoard);
}

export { MainGame, verifyShipPlacementSize, randomizeShipPlacement, checkForOpponentShip }