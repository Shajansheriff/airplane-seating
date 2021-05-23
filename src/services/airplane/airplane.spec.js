import {
  Airplane,
  AisleSeatConstructor,
  MiddleSeatConstructor,
  WindowSeatConstructor,
} from './airplane';

describe('Create seating chart', () => {
  it('should return an 2x2 seating chart', () => {
    const chart = Airplane.createSeatingChart([[2, 2]]);
    expect(chart).toEqual([
      [
        [WindowSeatConstructor(0), WindowSeatConstructor(1)],
        [WindowSeatConstructor(1), WindowSeatConstructor(2)],
      ],
    ]);
  });
  it('should return an 2x3 seating chart', () => {
    const chart = Airplane.createSeatingChart([[2, 3]]);
    expect(chart).toEqual([
      [
        [
          WindowSeatConstructor(0),
          MiddleSeatConstructor(1),
          WindowSeatConstructor(2),
        ],
        [
          WindowSeatConstructor(1),
          MiddleSeatConstructor(2),
          WindowSeatConstructor(3),
        ],
      ],
    ]);
  });

  it('should return an 2x3 , 3x4 seating chart', () => {
    const chart = Airplane.createSeatingChart([
      [2, 3],
      [3, 4],
    ]);
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
      [
        [
          AisleSeatConstructor(0),
          MiddleSeatConstructor(1),
          MiddleSeatConstructor(2),
          WindowSeatConstructor(3),
        ],
        [
          AisleSeatConstructor(1),
          MiddleSeatConstructor(2),
          MiddleSeatConstructor(3),
          WindowSeatConstructor(4),
        ],
        [
          AisleSeatConstructor(2),
          MiddleSeatConstructor(3),
          MiddleSeatConstructor(4),
          WindowSeatConstructor(5),
        ],
      ],
    ]);
  });
});
