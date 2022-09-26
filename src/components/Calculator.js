import Buttons from "./Buttons";
import Display from "./Display";

import styled from "styled-components";
const Calculator = () => {
  return (
    <Container>
      <Display />
      <Buttons />
      <hr />
    </Container>
  );
};

export default Calculator;

const Container = styled.div`
  width: 40.75rem;
  margin: 2rem auto;

  hr {
    margin: auto;
  }
`;
