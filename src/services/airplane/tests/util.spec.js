import { Airplane, toSeats } from '../airplane';

describe('Chart to seats', () => {
  it('should return seats', () => {
    const chart = Airplane.createSeatingChart([[2, 2]]);
    const result = toSeats(chart);
    expect(result.length).toEqual(4);
  });
  it('should return 26 seats', () => {
    const chart = Airplane.createSeatingChart([
      [5, 2],
      [4, 4],
    ]);
    const result = toSeats(chart);
    expect(result.length).toEqual(26);
  });
  it('should return empty seats', () => {
    const chart = Airplane.createSeatingChart([]);
    const result = toSeats(chart);
    expect(result.length).toEqual(0);
  });
});
