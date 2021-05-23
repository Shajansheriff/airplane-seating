import { unreachable } from '../../utils';

type Row = number;
type Column = number;
type TwoDimensionalArray = Array<[Row, Column]>;
export enum SeatType {
  Aisle = 'A',
  Middle = 'M',
  Window = 'W',
}

type WindowSeat = [SeatType.Window, Row, Column];
type AisleSeat = [SeatType.Aisle, Row, Column];
type MiddleSeat = [SeatType.Middle, Row, Column];
type Seat = WindowSeat | AisleSeat | MiddleSeat;
type RowColumn = [Row, Column];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RowColumn = (row: Row, column: Column): RowColumn => [row, column];

export const WindowSeatConstructor = ([row, column]: RowColumn): WindowSeat => [
  SeatType.Window,
  row,
  column,
];
export const AisleSeatConstructor = ([row, column]: RowColumn): AisleSeat => [
  SeatType.Aisle,
  row,
  column,
];
export const MiddleSeatConstructor = ([row, column]: RowColumn): MiddleSeat => [
  SeatType.Middle,
  row,
  column,
];

const SeatConstructor = (seatType: SeatType, rowColumn: RowColumn): Seat => {
  switch (seatType) {
    case SeatType.Aisle:
      return AisleSeatConstructor(rowColumn);
    case SeatType.Middle:
      return MiddleSeatConstructor(rowColumn);
    case SeatType.Window:
      return WindowSeatConstructor(rowColumn);
    default:
      return unreachable(seatType);
  }
};

type Seats = Array<Seat>;
type SeatMatrix = Array<Seats>;
type SeatingChart = Array<SeatMatrix>;
type CreateSeatingChartFn = (input: TwoDimensionalArray) => SeatingChart;

const createSeatingChart: CreateSeatingChartFn = (input) => {
  const firstSection = 0;
  const lastSection = input.length - 1;
  return input.map(([row, column], section) => {
    const matrix = new Array(row).fill(0).map(() => new Array(column).fill(0));
    return matrix.map((value, rowIndex) => {
      const firstColumn = 0;
      const lastColumn = value.length - 1;
      return value.map((col, colIndex) => {
        const idx = RowColumn(rowIndex, colIndex);
        switch (colIndex) {
          case firstColumn:
            return section === firstSection
              ? WindowSeatConstructor(idx)
              : AisleSeatConstructor(idx);
          case lastColumn:
            return section === lastSection
              ? WindowSeatConstructor(idx)
              : AisleSeatConstructor(idx);
          default:
            return MiddleSeatConstructor(idx);
        }
      });
    });
  });
};

export const Airplane = {
  createSeatingChart,
};
