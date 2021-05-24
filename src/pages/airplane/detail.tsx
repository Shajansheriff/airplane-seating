import styled from 'styled-components';
import React, { FC, useState } from 'react';
import { blue50, green50, red50, warmGray20 } from '@carbon/colors';
import { NumberInput, Tile } from 'carbon-components-react';
import { useParams } from 'react-router';
import { isNaN } from 'lodash';
import { Link } from 'react-router-dom';
import { parseString, unreachable } from '../../utils';
import { Airplane, SeatType } from '../../services/airplane/airplane';
import { useAirplane } from '../../store';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled(CenteredContainer)`
  justify-content: space-between;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  ${Legend} {
    margin: 0 8px;
  }
`;

const Container = styled(Tile)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  justify-content: center;
`;
const Section = styled.div`
  padding: 16px;
  border: 1px solid ${warmGray20};
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px;
  flex: 0 0 32px;
`;
const getSeatColor = (type: SeatType) => {
  switch (type) {
    case SeatType.Aisle:
      return blue50;
    case SeatType.Middle:
      return red50;
    case SeatType.Window:
      return green50;
    default:
      return unreachable(type);
  }
};
const Seat = styled.div<{ type: SeatType; size: number }>`
  min-height: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  margin: 4px;
  background-color: ${({ type }) => getSeatColor(type)};
  color: white;
  padding: 4px;
`;

const Aisle = styled.div`
  display: flex;
  min-width: 32px;
  height: 100%;
  &:last-of-type {
    display: none;
  }
`;
const SeatMapContainer = styled(Tile).attrs({ light: true })`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
`;
const SeatMap = styled.div`
  display: flex;
  justify-content: center;
`;

interface Params {
  airplaneId: string;
}
export const AirplaneDetailPage: FC = () => {
  const { airplaneId } = useParams<Params>();
  const airplane = useAirplane(airplaneId);
  const [passengerCount, setPassengerCount] = useState(0);
  if (!airplane) {
    return <>Not Found</>;
  }

  const chart = Airplane.createSeatingChart(parseString(airplane.map));
  const seatingInfo = Airplane.getSeatingStatus(passengerCount)(chart);

  return (
    <Container>
      <HeaderContainer>
        <div className="bx--data-table-header">
          <div className="bx--data-table-header__title">{airplane.name}</div>
          <div className="bx--data-table-header__description">Seat map</div>
        </div>
        <div className="bx--data-table-header">
          <div className="bx--data-table-header__title">{airplane.map}</div>
          <div className="bx--data-table-header__description">Dimensions</div>
        </div>
        <div className="bx--data-table-header">
          <div className="bx--data-table-header__title" data-cy="total-seats">
            {airplane.totalSeats}
          </div>
          <div className="bx--data-table-header__description">Seats</div>
        </div>
        <div>
          <NumberInput
            allowEmpty={false}
            size="sm"
            id="number"
            value={passengerCount}
            min={0}
            max={airplane.totalSeats}
            onChange={({ target: { value } }) => {
              const count = Number(value);
              console.log(count, value);
              if (!isNaN(Number(value))) {
                setPassengerCount(Number(value));
              }
            }}
            invalidText={`Max seats: ${airplane.totalSeats}`}
            helperText="Allot seats"
          />
        </div>
      </HeaderContainer>
      <SeatMapContainer>
        <SeatMap>
          {chart.map((section) => (
            <>
              <Section>
                {section.map((row) => (
                  <Row>
                    {row.map(([type, seat]) => {
                      const allottedPassenger =
                        seatingInfo[Airplane.toSeatId(seat)];
                      return (
                        <Seat
                          type={type}
                          size={32}
                          data-cy="seat"
                          data-cy-allotted={!!allottedPassenger}
                          data-cy-allotted-passenger={allottedPassenger}
                        >
                          {allottedPassenger}
                        </Seat>
                      );
                    })}
                  </Row>
                ))}
              </Section>
              <Aisle />
            </>
          ))}
        </SeatMap>
        <LegendContainer>
          <Legend>
            <Seat type={SeatType.Window} size={12} /> <div>Window Seat</div>
          </Legend>
          <Legend>
            <Seat type={SeatType.Middle} size={12} /> <div>Middle Seat</div>
          </Legend>

          <Legend>
            <Seat type={SeatType.Aisle} size={12} /> <div> Aisle Seat</div>
          </Legend>
        </LegendContainer>
      </SeatMapContainer>
      <CenteredContainer>
        <Link to="/">Back</Link>
      </CenteredContainer>
    </Container>
  );
};
