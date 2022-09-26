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
import Shift from "./Shift";
import Sin from "./Sin"
import Ln from "./Ln"
import Pi from "./Pi"
import Cos from "./Cos"
import Log from "./Log"
import E from "./E"
import Tan from "./Tan"
import Sqrt from "./Sqrt"
import Ans from "./Ans"
import Exp from "./Sin"
import Pow from "./Pow"
const Buttons = () => {
  return (
    <Container cellpadding="0" cellspacing="0">
      <AngleUnitSwitch />
      <Facotrial />
      <Parenthesis type={"("} />
      <Parenthesis type={")"} />
      <Percent role={"%"} />
      <CE />
      <Shift/>
      <Sin/> 
      <Ln/>
      <Digit digit={"7"} />
      <Digit digit={"8"} />
      <Digit digit={"9"} />
      <Operator sign={"÷"} />
      <Pi/>
      <Cos/>
      <Log  />
      <Digit digit={"4"} />
      <Digit digit={"5"} />
      <Digit digit={"6"} />
      <Operator sign={"×"} />
      <E/>
      <Tan />
      <Sqrt />
      <Digit digit={"1"} />
      <Digit digit={"2"} />
      <Digit digit={"3"} />
      <Operator sign={"-"} />
      <Ans/>
      <Exp/>
      <Pow />
      <Digit digit={"0"} />
      <DecimalPoint />
      <Eq  />
      <Operator sign={"+"} />
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
  grid-gap: 0.625rem 0.5rem;


`;
