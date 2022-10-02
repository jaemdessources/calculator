import styled from "styled-components";
import Key from "./Key";

//lib
import input from "../lib/input";
const Operator = ({ sign }) => {
  const clickHandler = () => {
    input(sign);
  };
  return (
    <Key>
      <Container onClick={clickHandler}>{sign}</Container>
    </Key>
  );
};

export default Operator;

const Container = styled.div`
  background: #5f6368;
  line-height: 2.125rem;
  height: 100%;
  font-size: 1.125rem;
  color: #e8eaed;
  border-radius: 0.25rem;
  &:hover {
    background: #70757a;
  }
`;
