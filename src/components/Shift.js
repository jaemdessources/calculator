import styled from "styled-components";
import Key from "./Key";
const Shift = ({ setInverse, inverse }) => {
  return (
    <Key>
      <Container
        onClick={() => setInverse(!inverse)}
        className={inverse && "on"}
        id="shift"
        tabIndex={0}
      >
        SHIFT
      </Container>
    </Key>
  );
};

export default Shift;

const Container = styled.div`
  background: #5f6368;
  line-height: 2.125rem;
  height: 100%;
  font-size: 0.875rem;
  color: #e8eaed;
  border-radius: 0.25rem;
  &.on {
    background: #3c4043;
  }
  &.on:hover {
    background: #424548;
  }
  &:focus {
    border: 1px solid #9aa0a6;
  }
  &:hover {
    background: #70757a;
  }
`;
