import Gameboard from "./Gameboard"

export default function player() {
  let gameBoard = Gameboard();
  let turn = false;

  const getGameBoard = () => {
    return gameBoard;
  }

  const setTurn = (state) => {
    turn = state;
  }

  const getTurn = () => {
    return turn;
  }

  const receiveAttack = (x, y) => {
    const result = gameBoard.receiveAttack(x, y);

    return result;
  }

  return { getGameBoard, setTurn, getTurn, receiveAttack }
}