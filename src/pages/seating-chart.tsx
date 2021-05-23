import styled from 'styled-components';
import React, { FC } from 'react';
import { green50, red50, blue50, warmGray20 } from '@carbon/colors';
import { unreachable } from '../utils';
import { Airplane, SeatType } from '../services/airplane/airplane';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  width: 500px;
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
  flex: 0 0 40px;
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
const Seat = styled.div<{ type: SeatType }>`
  min-height: 40px;
  min-width: 40px;
  margin: 4px;
  background-color: ${({ type }) => getSeatColor(type)};
`;

const Aisle = styled.div`
  display: flex;
  min-width: 32px;
  height: 100%;
  &:last-of-type {
    display: none;
  }
`;

export const SeatingChartPage: FC = () => {
  const result = Airplane.createSeatingChart([
    [2, 3],
    [3, 4],
    [3, 2],
    [4, 3],
  ]);
  return (
    <Container>
      {result.map((section) => (
        <>
          <Section>
            {section.map((row) => (
              <Row>
                {row.map(([type]) => (
                  <Seat type={type} />
                ))}
              </Row>
            ))}
          </Section>
          <Aisle />
        </>
      ))}
    </Container>
  );
};
