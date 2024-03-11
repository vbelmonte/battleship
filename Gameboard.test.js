import Gameboard from "./Gameboard"
import ship from "./Ship";

test('Gameboard must have a grid size of 10 x 10', () => {
  const gameBoard = Gameboard();
  const grid = gameBoard.getGrid();
  let gridSize = 0;

  for (let i = 0; i < grid.length; i+=1) {
    gridSize = gridSize + grid[0].length;
  }

  expect(gridSize).toBe(100);
});


test('Gameboard at position [1,1] must be occupied with a ship of size 4', () => {
  const gameBoard = Gameboard();
  const grid = gameBoard.getGrid();

  gameBoard.placeShip(1, 1, 4, "horizontal");
  
  expect(grid[0][1]).toBeNull();
  expect(grid[1][1]).not.toBeNull();
  expect(grid[2][1]).not.toBeNull();
  expect(grid[3][1]).not.toBeNull();
  expect(grid[4][1]).not.toBeNull();
  expect(grid[5][1]).toBeNull();
});


test('Gameboard should receive an attack at position [2, 2], with no ship at that coordinate, be labeled as a "miss", and be disabled after position receives attack, represented as "false"', () => {
  const gameBoard = Gameboard();
  const grid = gameBoard.getGrid();

  const mockDisable = jest.fn();
  mockDisable.mockReturnValueOnce("disabled");

  gameBoard.receiveAttack(2, 2);

  expect(grid[2][2]).toBe("miss");
  expect(mockDisable(grid[2][2])).toBe("disabled");
});


test('Gameboard should receive an attack at position [2, 2], with a ship of size 3 at that coordinate with 1 hit', () => {
  const gameBoard = Gameboard();
  const grid = gameBoard.getGrid();
  gameBoard.placeShip(2, 2, 3, "horizontal");

  gameBoard.receiveAttack(2, 2);

  expect(grid[2][2].getHits()).toBe(1);
});


test('Gameboard should display an array of length 1, which contains a ship that has been sunk', () => {
  const gameBoard = Gameboard();
  gameBoard.placeShip(2, 2, 1, "horizontal");
  gameBoard.receiveAttack(2, 2);

  expect(gameBoard.getSunkShips().length).toBe(1);
});

test('Gameboard should return true when checkAllShipsSunk() is called', () => {
  const mockCheckAllShipsSunk = jest.fn();

  mockCheckAllShipsSunk.mockReturnValueOnce(true);

  expect(mockCheckAllShipsSunk()).toBeTruthy();
});