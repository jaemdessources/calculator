import styled from "styled-components";
import Key from "./Key";
const Pow = ({ inverse, handleClick }) => {
  return (
    <Key>
      <Container className={inverse && "off"} onClick={() => handleClick("x^y")}>
        x<sup>y</sup>
      </Container>
      <Container className={`${!inverse ? "off" : ""}`} onClick={() => handleClick("y√x")}>
        <sup>y</sup>√x
      </Container>
    </Key>
  );
};

export default Pow;

const Container = styled.div`
  background: #5f6368;
  line-height: 2.125rem;
  height: 100%;
  font-size: 0.875rem;
  color: #e8eaed;
  border-radius: 0.25rem;
  &:hover {
    background: #70757a;
  }

  sup {
    font-size: 0.5rem;
  }
`;
