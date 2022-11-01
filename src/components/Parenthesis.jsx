import styled from "styled-components";
import Key from "./Key";

const Parenthesis = ({ type, handleClick }) => {
  return (
    <Key>
      <Container onClick={() => handleClick(type)}>{type === "(" ? "(" : ")"}</Container>
    </Key>
  );
};

export default Parenthesis;

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
