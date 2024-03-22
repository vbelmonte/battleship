import player from "./Player";

test('Player 1 and Computer each have a gameboard property', () => {
  const player1 = player();
  const computer = player();

  expect(player1.getGameBoard()).toBeDefined();
  expect(computer.getGameBoard()).toBeDefined();
});


test("It is Player 1's turn, which should return true", () => {
  const player1 = player();
  const computer = player();

  player1.setTurn(false)
  computer.setTurn(false);

  const mockTurnDeterminer = jest.fn(() => {
    if (computer.getTurn() === false) {
      player1.setTurn(true);
    }
  });

  mockTurnDeterminer();

  expect(player1.getTurn()).toBeTruthy();
});


test('Player 1 sends an attack to computer, which is counted as a "miss"/false', () => {
  const player1 = Object.create(player());
  const computer = Object.create(player());
  const compGameBoard = computer.getGameBoard();

  const mockReceiveAttack = jest.fn((x, y) => compGameBoard.receiveAttack(x, y));
  computer.receiveAttack = mockReceiveAttack;

  const mockSendAttack = jest.fn(opponent => opponent.receiveAttack(1, 1));
  player1.sendAttack = mockSendAttack;

  expect(player1.sendAttack(computer)).not.toBeTruthy();
});


test('Player 1 sends an attack to computer, which is counted as a "miss"/false, and results in a turn for computer', () => {
  const player1 = Object.create(player());
  const computer = Object.create(player());
  const compGameBoard = computer.getGameBoard();

  const mockReceiveAttack = jest.fn((x, y) => compGameBoard.receiveAttack(x, y));
  computer.receiveAttack = mockReceiveAttack;

  const mockSendAttack = jest.fn(opponent => opponent.receiveAttack(1, 1));
  player1.sendAttack = mockSendAttack;

  const mockGamePlay = jest.fn(() => {
    player1.setTurn(true);
    computer.setTurn(false);

    let attackResult = player1.sendAttack(computer);

    if (!attackResult) {
      player1.setTurn(false);
      computer.setTurn(true);
    }
  });

  mockGamePlay();

  expect(player1.getTurn()).not.toBeTruthy();
  expect(computer.getTurn()).toBeTruthy();
});


test('Computer receives an attack, which is counted as a "hit"/true, and results in another turn for Player 1', () => {
  const player1 = Object.create(player());
  const computer = Object.create(player());
  const compGameBoard = computer.getGameBoard();
  
  compGameBoard.placeShip(1, 1, 1, "horizontal");

  const mockReceiveAttack = jest.fn((x, y) => compGameBoard.receiveAttack(x, y));
  computer.receiveAttack = mockReceiveAttack;

  const mockSendAttack = jest.fn(opponent => opponent.receiveAttack(1, 1));
  player1.sendAttack = mockSendAttack;

  const mockGamePlay = jest.fn(() => {
    player1.setTurn(true);
    computer.setTurn(false);

    let attackResult = player1.sendAttack(computer);

    if (!attackResult) {
      player1.setTurn(false);
      computer.setTurn(true);
    } else {
      player1.setTurn(true);
      computer.setTurn(false);
    }
  });

  mockGamePlay();

  expect(player1.getTurn()).toBeTruthy();
  expect(computer.getTurn()).not.toBeTruthy();
});

test('Computer knows to send an attack to a square that has not been hit yet by using a list of available squares', () => {
  const player1 = Object.create(player());
  const computer = Object.create(player());
  const p1GameBoard = player1.getGameBoard();

  p1GameBoard.placeShip(1, 1, 1, "horizontal");

  const mockReceiveAttack = jest.fn((x, y) => p1GameBoard.receiveAttack(x, y));
  player1.receiveAttack = mockReceiveAttack;

  const mockSendAttack = jest.fn(opponent => opponent.receiveAttack(1, 1));
  computer.sendAttack = mockSendAttack;

  computer.sendAttack(player1);

  const mockGamePlay = jest.fn(() => {
    player1.setTurn(false);
    computer.setTurn(true);

    computer.sendAttack(player1);
    return computer.sendAttack(player1);
  });

  expect(mockGamePlay()).toMatch(/square already hit!/);
  
});