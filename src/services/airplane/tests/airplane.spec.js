import {
  Airplane,
  AisleSeatConstructor,
  MiddleSeatConstructor,
  RowColumn,
  WindowSeatConstructor,
} from '../airplane';

describe('Create seating chart', () => {
  it('should return an 2x2 seating chart', () => {
    const chart = Airplane.createSeatingChart([[2, 2]]);
    expect(chart).toEqual([
      [
        [
          WindowSeatConstructor(RowColumn(0, 0, 0)),
          WindowSeatConstructor(RowColumn(0, 0, 1)),
        ],
        [
          WindowSeatConstructor(RowColumn(0, 1, 0)),
          WindowSeatConstructor(RowColumn(0, 1, 1)),
        ],
      ],
    ]);
  });
  it('should return an 2x3 seating chart', () => {
    const chart = Airplane.createSeatingChart([[2, 3]]);
    expect(chart).toEqual([
      [
        [
          WindowSeatConstructor(RowColumn(0, 0, 0)),
          MiddleSeatConstructor(RowColumn(0, 0, 1)),
          WindowSeatConstructor(RowColumn(0, 0, 2)),
        ],
        [
          WindowSeatConstructor(RowColumn(0, 1, 0)),
          MiddleSeatConstructor(RowColumn(0, 1, 1)),
          WindowSeatConstructor(RowColumn(0, 1, 2)),
        ],
      ],
    ]);
  });

  it('should return an 3x2, 4x3, 2x3, 3x4 seating chart', () => {
    const chart = Airplane.createSeatingChart([
      [3, 2],
      [4, 3],
      [2, 3],
      [3, 4],
    ]);
    expect(chart).toEqual([
      [
        [
          WindowSeatConstructor(RowColumn(0, 0, 0)),
          AisleSeatConstructor(RowColumn(0, 0, 1)),
        ],
        [
          WindowSeatConstructor(RowColumn(0, 1, 0)),
          AisleSeatConstructor(RowColumn(0, 1, 1)),
        ],
        [
          WindowSeatConstructor(RowColumn(0, 2, 0)),
          AisleSeatConstructor(RowColumn(0, 2, 1)),
        ],
      ],
      [
        [
          AisleSeatConstructor(RowColumn(1, 0, 0)),
          MiddleSeatConstructor(RowColumn(1, 0, 1)),
          AisleSeatConstructor(RowColumn(1, 0, 2)),
        ],
        [
          AisleSeatConstructor(RowColumn(1, 1, 0)),
          MiddleSeatConstructor(RowColumn(1, 1, 1)),
          AisleSeatConstructor(RowColumn(1, 1, 2)),
        ],
        [
          AisleSeatConstructor(RowColumn(1, 2, 0)),
          MiddleSeatConstructor(RowColumn(1, 2, 1)),
          AisleSeatConstructor(RowColumn(1, 2, 2)),
        ],
        [
          AisleSeatConstructor(RowColumn(1, 3, 0)),
          MiddleSeatConstructor(RowColumn(1, 3, 1)),
          AisleSeatConstructor(RowColumn(1, 3, 2)),
        ],
      ],
      [
        [
          AisleSeatConstructor(RowColumn(2, 0, 0)),
          MiddleSeatConstructor(RowColumn(2, 0, 1)),
          AisleSeatConstructor(RowColumn(2, 0, 2)),
        ],
        [
          AisleSeatConstructor(RowColumn(2, 1, 0)),
          MiddleSeatConstructor(RowColumn(2, 1, 1)),
          AisleSeatConstructor(RowColumn(2, 1, 2)),
        ],
      ],
      [
        [
          AisleSeatConstructor(RowColumn(3, 0, 0)),
          MiddleSeatConstructor(RowColumn(3, 0, 1)),
          MiddleSeatConstructor(RowColumn(3, 0, 2)),
          WindowSeatConstructor(RowColumn(3, 0, 3)),
        ],
        [
          AisleSeatConstructor(RowColumn(3, 1, 0)),
          MiddleSeatConstructor(RowColumn(3, 1, 1)),
          MiddleSeatConstructor(RowColumn(3, 1, 2)),
          WindowSeatConstructor(RowColumn(3, 1, 3)),
        ],
        [
          AisleSeatConstructor(RowColumn(3, 2, 0)),
          MiddleSeatConstructor(RowColumn(3, 2, 1)),
          MiddleSeatConstructor(RowColumn(3, 2, 2)),
          WindowSeatConstructor(RowColumn(3, 2, 3)),
        ],
      ],
    ]);
  });

  it('should assign 2 aisle seats', () => {
    const chart = Airplane.createSeatingChart([
      [2, 2],
      [2, 2],
    ]);
    const seatingStatus = Airplane.getSeatingStatus(2)(chart);
    expect(seatingStatus).toEqual({ '001': 1, 100: 2 });
  });

  it('should assign 4 aisle seats, 1 window seat', () => {
    const chart = Airplane.createSeatingChart([
      [2, 2],
      [2, 2],
    ]);
    const seatingStatus = Airplane.getSeatingStatus(5)(chart);
    expect(seatingStatus).toEqual({
      '001': 1,
      100: 2,
      '011': 3,
      110: 4,
      '000': 5,
    });
  });
});
