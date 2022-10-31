import styled from "styled-components";
import Key from "./Key";
const Cos = ({ inverse }) => {
  return (
    <Key>
      <Container className={inverse && "off"}>cos</Container>
      <Container className={`${!inverse ? "off" : ""} inverse`}>
        cos<sup>{"\u2212"}1</sup>
      </Container>
    </Key>
  );
};

export default Cos;

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
  /* &:focus {
    border: 1px solid #9aa0a6;
  } */
`;
