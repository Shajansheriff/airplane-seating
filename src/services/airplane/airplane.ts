import { last, set } from 'lodash';
import { unreachable } from '../../utils';

type Row = number;
type Column = number;
type SectionId = number;
export type TwoDimensionalArray = Array<[Row, Column]>;
export enum SeatType {
  Aisle = 'A',
  Middle = 'M',
  Window = 'W',
}

type RowColumn = [SectionId, Row, Column];
type BaseSeat<T> = [T, RowColumn];
type WindowSeat = BaseSeat<SeatType.Window>;
type AisleSeat = BaseSeat<SeatType.Aisle>;
type MiddleSeat = BaseSeat<SeatType.Middle>;
type Seat = WindowSeat | AisleSeat | MiddleSeat;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RowColumn = (
  sectionId: SectionId,
  row: Row,
  column: Column,
): RowColumn => [sectionId, row, column];

export const WindowSeatConstructor = (input: RowColumn): WindowSeat => [
  SeatType.Window,
  input,
];
export const AisleSeatConstructor = (input: RowColumn): AisleSeat => [
  SeatType.Aisle,
  input,
];
export const MiddleSeatConstructor = (input: RowColumn): MiddleSeat => [
  SeatType.Middle,
  input,
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
const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const toAlpha = (index: number): string => {
  return String(index)
    .split('')
    .map((each) => alphabet[Number(each)])
    .join('');
};

type Seats = Array<Seat>;
type Section = Array<Seats>;
type SeatingChart = Array<Section>;
type CreateSeatingChartFn = (input: TwoDimensionalArray) => SeatingChart;

const createSeatingChart: CreateSeatingChartFn = (input) => {
  const firstSection = 0;
  const lastSection = input.length - 1;
  const columns = input.map(([, col]) => col);
  const totalColumns = columns.reduce((total, col) => {
    return total + col;
  }, 0);
  return input.map(([rowCount, columnCount], section) => {
    const matrix = new Array(rowCount)
      .fill(0)
      .map(() => new Array(columnCount).fill(0));
    return matrix.map((row, rowIndex) => {
      const firstColumn = 0;
      const lastColumn = row.length - 1;
      return row.map((col, colIndex) => {
        const idx = RowColumn(section, rowIndex, colIndex);
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
    const lastRow = last(chart.map((s) => s.length).sort());
    if (lastRow != null) {
      // eslint-disable-next-line no-plusplus
      for (let rowIndex = 0; rowIndex < lastRow; rowIndex++) {
        chart.forEach((section) => {
          const row = section[rowIndex];
          if (row) {
            const result = row.filter((seat) => seat[0] === seatType);
            seats.push(...result);
          }
        });
      }
    }

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

const toSeatId = (input: RowColumn): string => {
  return input.join('');
};

const assign = (
  seats: Seats,
  initialCount = 0,
  totalPassengerCount = 0,
): Record<string, number> => {
  let assigned = initialCount;
  return seats.reduce((status, [, seat]) => {
    if (totalPassengerCount - assigned > 0) {
      assigned += 1;
      return set(status, toSeatId(seat), assigned);
    }
    return status;
  }, {});
};

const allottedSeats = (status: Record<string, number>) => {
  return Object.keys(status);
};

const getSeatingStatus =
  (passengerCount = 0) =>
  (chart: SeatingChart): Record<string, Record<string, number | undefined>> => {
    const seatStatus = {};

    return [
      getAllAisleSeats(chart),
      getAllWindowSeats(chart),
      getAllMiddleSeats(chart),
    ].reduce((status, seats) => {
      const totalAssigned = allottedSeats(status).length;
      const result = assign(seats, totalAssigned, passengerCount);
      return { ...status, ...result };
    }, seatStatus);
  };

export const totalSeats = (input: TwoDimensionalArray): number => {
  return input.reduce((seats, [row, col]) => {
    return seats + row * col;
  }, 0);
};

export const Airplane = {
  createSeatingChart,
  getSeatingStatus,
  toSeatId,
  totalSeats,
};
