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

  return { getGameBoard, setTurn, getTurn }
}