import styled from 'styled-components';
import React, { FC } from 'react';
import { Airplane } from '../services/airplane/airplane';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  width: 500px;
`;
const Section = styled.div`
  padding: 16px;
  border: 1px solid black;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px;
  flex: 0 0 40px;
`;
const Seat = styled.div`
  min-height: 40px;
  min-width: 40px;
  margin: 4px;
  border: 1px solid dodgerblue;
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
    [3, 2],
    [4, 3],
    [2, 3],
    [3, 4],
  ]);
  return (
    <Container>
      {result.map((section) => (
        <>
          <Section>
            {section.map((row) => (
              <Row>
                {row.map((seat) => (
                  <Seat />
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
