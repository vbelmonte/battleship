import ship from "./Ship";

test('Ship length should be 4', () => {
    const mockShip4 = ship(4);
    expect(mockShip4.getShipLength()).toBe(4);
});

test('Ship length should be hit 1 time after hit() is invoked', () => {
    const ship1 = ship(1);
    
    ship1.hit();

    expect(ship1.getHits()).toBe(1);
});

test('Ship of length 1 has 1 hit, and therefore return true if isSunk() is invoked', () => {
    const mockShip1 = ship(1);

    mockShip1.hit();

    expect(mockShip1.isSunk()).toBeTruthy();
});