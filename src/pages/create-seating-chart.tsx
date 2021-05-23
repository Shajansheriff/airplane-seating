import { Button, Form, TextInput, Tile } from 'carbon-components-react';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
`;
const FormContainer = styled(Tile).attrs({ light: true })`
  padding: 2rem;
`;
const Heading = styled.h2`
  margin-bottom: 2rem;
  width: 80%;
`;
export const CreateSeatingChartPage = () => {
  return (
    <Container>
      <FormContainer className="bx--col-lg-5">
        <Heading>Create a new Airplane seat chart</Heading>
        <Form>
          <div className="" style={{ marginBottom: '2rem' }}>
            <TextInput
              id="input"
              labelText="Dimensions"
              helperText="Example: [2,3], [3,3]"
            />
          </div>
          <Button kind="primary">Submit</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};
