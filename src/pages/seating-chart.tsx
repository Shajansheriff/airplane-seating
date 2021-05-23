import styled from 'styled-components';
import React, { FC } from 'react';

const Container = styled.div``;
const Section = styled.div``;
const Row = styled.div``;
const Seat = styled.div``;
const Aisle = styled.div``;

export const SeatingChartPage: FC = () => {
  return (
    <Container>
      <Section>
        <Row>
          <Seat />
        </Row>
      </Section>
      <Aisle />
    </Container>
  );
};
