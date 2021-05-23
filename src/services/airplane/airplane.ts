import { unreachable } from '../../utils';

type Row = number;
type Column = number;
type TwoDimensionalArray = Array<[Row, Column]>;
export enum SeatType {
  Aisle = 'A',
  Middle = 'M',
  Window = 'W',
}

type BaseSeat<T> = [T, Row, Column];
type WindowSeat = BaseSeat<SeatType.Window>;
type AisleSeat = BaseSeat<SeatType.Aisle>;
type MiddleSeat = BaseSeat<SeatType.Middle>;
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

type GetSeatsFunc = (seatType: SeatType) => (chart: SeatingChart) => Seats;

const getSeats: GetSeatsFunc =
  (seatType: SeatType) => (chart: SeatingChart) => {
    const seats: Seats = [];
    chart.forEach((section) => {
      section.forEach((row) => {
        const result = row.filter((seat) => seat[0] === seatType);
        seats.push(...result);
      });
    });
    return seats;
  };

const getAllAisleSeats = (chart: SeatingChart): AisleSeat[] =>
  getSeats(SeatType.Aisle)(chart) as AisleSeat[];
const getAllWindowSeats = (chart: SeatingChart): WindowSeat[] =>
  getSeats(SeatType.Window)(chart) as WindowSeat[];
const getAllMiddleSeats = (chart: SeatingChart): MiddleSeat[] =>
  getSeats(SeatType.Middle)(chart) as MiddleSeat[];

export const toSeats = (chart: SeatingChart): Seats => {
  return Object.values(SeatType).reduce((seats: Seats, type) => {
    return [...seats, ...getSeats(type as SeatType)(chart)];
  }, []);
};

type PassengerId = number;
type FilledSeat = ['filled', PassengerId, Seat];
type EmptySeat = ['empty', PassengerId, Seat];

const assignSeats =
  (passengerCount = 0) =>
  (chart: SeatingChart) => {};

export const Airplane = {
  createSeatingChart,
};
