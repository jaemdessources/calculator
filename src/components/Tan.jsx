import styled from "styled-components";
import Key from "./Key";
const Tan = ({ inverse, handleClick }) => {
  return (
    <Key>
      {/* when the value of the boolean inverse changes the "off" class is toggled to switch between 
      the two containers. the off class simply adds a display: none to the container*/}
      <Container className={inverse && "off"} onClick={() => handleClick("tan")}>
        tan
      </Container>
      <Container className={(!inverse && "off") + " inverse"} onClick={() => handleClick("arctan")}>
        tan<sup>{"\u2212"}1</sup>
      </Container>
    </Key>
  );
};

export default Tan;

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
`;
