import styled from "styled-components";
import Key from "./Key";
import AngleUnitSwitch from "./AngleUnitSwitch";
import Eq from "./Eq";
import Operator from "./Operator";
import Digit from "./Digit";
import DecimalPoint from "./DecimalPoint";
import Parenthesis from "./Parenthesis";
import Percent from "./Percent";
import CE from "./CE";
import Facotrial from "./Factorial";

const Buttons = () => {
  return (
    <Container cellpadding="0" cellspacing="0">
      <AngleUnitSwitch />
      <Facotrial />
      <Parenthesis type={"("} />
      <Parenthesis type={")"} />
      <Percent role={"%"} />
      <CE />
      <Key role={"SHIFT"} />
      <Key role={"sine"} /> <Key role={"ln"} />
      <Digit digit={"7"} />
      <Digit digit={"8"} />
      <Digit digit={"9"} />
      <Operator sign={"÷"} />
      <Key role={"pi"} />
      <Key role={"cosine"} />
      <Key role={"log"} />
      <Digit digit={"4"} />
      <Digit digit={"5"} />
      <Digit digit={"6"} />
      <Operator sign={"×"} />
      <Key role={"e"} />
      <Key role={"tangent"} />
      <Key role={"sqrt"} />
      <Digit digit={"1"} />
      <Digit digit={"2"} />
      <Digit digit={"3"} />
      <Operator sign={"-"} />
      <Key role={"ANS"} />
      <Key role={"EXP"} />
      <Key role={"power"} />
      <Digit digit={"0"} />
      <DecimalPoint />
      <Eq role={"="} />
      <Operator sign={"+"} />
    </Container>
  );
};

export default Buttons;

const Container = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 0.5rem;

  .eq {
    background: #8ab4f8;
    color: #202124;
    font-weight: bold;
  }
`;
