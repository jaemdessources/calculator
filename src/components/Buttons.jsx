import { useState } from "react";
import styled from "styled-components";
import AngleUnitSwitch from "./AngleUnitSwitch";
import Eq from "./Eq";
import Operator from "./Operator";
import Digit from "./Digit";
import DecimalPoint from "./DecimalPoint";
import Parenthesis from "./Parenthesis";
import Percent from "./Percent";
import CE from "./CE";
import Factorial from "./Factorial";
import Shift from "./Shift";
import Sin from "./Sin";
import Ln from "./Ln";
import Pi from "./Pi";
import Cos from "./Cos";
import Log from "./Log";
import E from "./E";
import Tan from "./Tan";
import Sqrt from "./Sqrt";
import Ans from "./Ans";
import Exp from "./Exp";
import Pow from "./Pow";

const Buttons = ({ handleClick }) => {
  const [inverse, setInverse] = useState(false);
  return (
    <Container cellpadding="0" cellspacing="0">
      <AngleUnitSwitch />
      <Factorial handleClick={handleClick} />
      <Parenthesis type={"("} handleClick={handleClick} />
      <Parenthesis type={")"} handleClick={handleClick} />
      <Percent role={"%"} handleClick={handleClick} />
      <CE />
      <Shift setInverse={setInverse} inverse={inverse} />
      <Sin inverse={inverse} handleClick={handleClick} />
      <Ln inverse={inverse} handleClick={handleClick} />
      <Digit digit={"7"} handleClick={handleClick} />
      <Digit digit={"8"} handleClick={handleClick} />
      <Digit digit={"9"} handleClick={handleClick} />
      <Operator sign={"÷"} handleClick={handleClick} />
      <Pi handleClick={handleClick} />
      <Cos inverse={inverse} handleClick={handleClick} />
      <Log inverse={inverse} handleClick={handleClick} />
      <Digit digit={"4"} handleClick={handleClick} />
      <Digit digit={"5"} handleClick={handleClick} />
      <Digit digit={"6"} handleClick={handleClick} />

      <Operator sign={"×"} handleClick={handleClick} />
      <E handleClick={handleClick} />
      <Tan inverse={inverse} handleClick={handleClick} />
      <Sqrt inverse={inverse} handleClick={handleClick} />
      <Digit digit={"1"} handleClick={handleClick} />
      <Digit digit={"2"} handleClick={handleClick} />
      <Digit digit={"3"} handleClick={handleClick} />
      <Operator sign={"-"} handleClick={handleClick} />
      <Ans inverse={inverse} handleClick={handleClick} />
      <Exp handleClick={handleClick} />
      <Pow inverse={inverse} handleClick={handleClick} />
      <Digit digit={"0"} handleClick={handleClick} />
      <DecimalPoint handleClick={handleClick} />
      <Eq handleClick={handleClick} />
      <Operator sign={"+"} handleClick={handleClick} />
    </Container>
  );
};

export default Buttons;

const Container = styled.div`
  margin-top: 0.625rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 0.5rem;
`;
