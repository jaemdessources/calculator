import styled from "styled-components";
import Key from "./Key";
import input from "../lib/input";
const Factorial = ({ type }) => {
  const clickHandler = () => {
    input("!");
  };
  return (
    <Key>
      <Container onClick={clickHandler}>x!</Container>
    </Key>
  );
};

export default Factorial;

const Container = styled.div`
  background: #5f6368;
  line-height: 2.125rem;
  height: 100%;
  font-size: 0.8125rem;
  color: #e8eaed;
  border-radius: 0.25rem;
  &:hover {
    background: #70757a;
  }
`;
