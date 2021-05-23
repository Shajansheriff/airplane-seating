type Row = number;
type Column = number;
type TwoDimensionalArray = Array<[Row, Column]>;

type CreateSeatingChartFn = (input: TwoDimensionalArray) => void;
export enum SeatType {
  Aisle = 'A',
  Middle = 'M',
  Window = 'W',
}

type WindowSeat = [SeatType.Window, number];
type AisleSeat = [SeatType.Aisle, number];
type MiddleSeat = [SeatType.Middle, number];
type Seat = WindowSeat | AisleSeat | MiddleSeat;

export const WindowSeatConstructor = (index: number): WindowSeat => [
  SeatType.Window,
  index,
];
export const AisleSeatConstructor = (index: number): AisleSeat => [
  SeatType.Aisle,
  index,
];
export const MiddleSeatConstructor = (index: number): MiddleSeat => [
  SeatType.Middle,
  index,
];

type Seats = Array<Seat>;
type SeatMatrix = Array<Seats>;
type SeatingChart = Array<SeatMatrix>;

const createSeatingChart: CreateSeatingChartFn = (input) => {
  const firstSection = 0;
  const lastSection = input.length - 1;
  return input.map(([row, column], section) => {
    // first & last group will have window seats
    const matrix = new Array(row).fill(0).map(() => new Array(column).fill(0));
    // if (section === firstSection || section === lastSection) {
    return matrix.map((value, i) => {
      return value.map((col, colIndex) => {
        const idx = i + colIndex;
        if (colIndex === 0) {
          return WindowSeatConstructor(idx);
        }
        if (colIndex === value.length - 1) {
          return AisleSeatConstructor(idx);
        }
        return MiddleSeatConstructor(idx);
      });
    });
    // }
  });
};

export const Airplane = {
  createSeatingChart,
};
