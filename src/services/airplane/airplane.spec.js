import {
  Airplane,
  AisleSeatConstructor,
  MiddleSeatConstructor,
  WindowSeatConstructor,
} from './airplane';

describe('Create seating chart', () => {
  it('should return an array of seats', () => {
    const chart = Airplane.createSeatingChart([[2, 3]]);
    console.log(chart);
    expect(chart).toEqual([
      [
        [
          WindowSeatConstructor(0),
          MiddleSeatConstructor(1),
          AisleSeatConstructor(2),
        ],
        [
          WindowSeatConstructor(1),
          MiddleSeatConstructor(2),
          AisleSeatConstructor(3),
        ],
      ],
    ]);
  });
});
