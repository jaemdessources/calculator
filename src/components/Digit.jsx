import styled from "styled-components";
import Key from "./Key";

//lib
import input from "../lib/input";
const Digit = ({ digit }) => {
  const clickHandler = () => {
    input(digit);
  };

  return (
    <Key>
      <Container onClick={clickHandler}>{digit}</Container>
    </Key>
  );
};

export default Digit;

const Container = styled.div`
  line-height: 2.125rem;
  height: 100%;
  color: #e8eaed;
  background: #3c4043;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  &:hover {
    background: #424548;
  }
`;
