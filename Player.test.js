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
    if (computer1.getTurn() === false) {
      player1.setTurn(true);
    }
  });

  mockTurnDeterminer();

  expect(player1.getTurn()).toBeTruthy();
});


test('Player 1 sends an attack to computer, which is counted as a "miss"/false', () => {
  const player1 = Object.create(player());
  const computer = player();
  const mockSendAttack = jest.fn(opponent => opponent.receiveAttack());

  player1.sendAttack = mockSendAttack;

  expect(player1.sendAttack(computer)).not.toBeTruthy();
});


test('Player 1 sends an attack to computer, which is counted as a "miss"/false, and results in a turn for computer', () => {
  const player1 = Object.create(player());
  const computer = player();
  const mockSendAttack = jest.fn(opponent => opponent.receiveAttack());

  player1.sendAttack = mockSendAttack;

  const mockGamePlay = jest.fn(() => {
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
  const computer = player();
  const mockSendAttack = jest.fn(opponent => opponent.receiveAttack());

  player1.sendAttack = mockSendAttack;

  const mockGamePlay = jest.fn(() => {
    let attackResult = player1.sendAttack(computer);

    if (!attackResult) {
      player1.setTurn(false);
      computer.setTurn(true);
    }
  });

  mockGamePlay();

  expect(player1.getTurn()).toBeTruthy();
  expect(computer.getTurn()).not.toBeTruthy();
});