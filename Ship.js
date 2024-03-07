export default function ship(shipSize) {
  let length = shipSize;
  let hits = 0;
  let sunk = false;

  const sinkShip = () => {
    sunk = true;
  }

  const hit = () => {
    hits++;

    if (length === hits) {
      sinkShip();
    }
  }

  const getHits = () => {
    return hits;
  }

  const getShipLength = () => {
    return length;
  }

  const isSunk = () => {
    if (length === hits) {
      return true;
    } else {
      return false;
    }
  }

  return {hit, getShipLength, getHits, isSunk};
}