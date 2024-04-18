import MainGame, { verifyShipPlacementSize } from "./MainGame";

/*test('Wait for player 1 to initialize game by pressing "Start Game"', () => {
  const mockPressStart = jest.fn(() => {
    return MainGame().startGame();
  });

  expect(mockPressStart()).toBe('Game has begun!');
});*/


test('verifyShipPlacement should return false on a ship that goes out of bounds on the board', () => {
  const shipLength = 5;
  const x = 9;
  const y = 0;
  const orientation = "horizontal";

  expect(verifyShipPlacementSize(x, y, shipLength, orientation)).not.toBeTruthy();
});