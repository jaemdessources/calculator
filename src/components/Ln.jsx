import styled from "styled-components";
import Key from "./Key";
const Ln = ({ inverse, handleClick }) => {
  return (
    <Key>
      <Container className={inverse && "off"} onClick={() => handleClick("ln")}>
        ln
      </Container>
      <Container className={`${!inverse ? "off" : ""} inverse`} onClick={() => handleClick("e^x")}>
        e<sup>x</sup>
      </Container>
    </Key>
  );
};

export default Ln;

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
