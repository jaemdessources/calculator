import styled from "styled-components";
import Key from "./Key";
import AngleUnitSwitch from "./AngleUnitSwitch";
import Eq from "./Eq";

const Buttons = () => {
  return (
    <Container cellpadding="0" cellspacing="0">
      <AngleUnitSwitch role={"?"} />
      <Key role={"factorial"} />
      <Key role={"("} />
      <Key role={")"} />
      <Key role={"%"} />
      <Key role={"CE"} />
      <Key role={"SHIFT"} />
      <Key role={"sine"} /> <Key role={"ln"} />
      <Key role={"7"} />
      <Key role={"8"} />
      <Key role={"9"} />
      <Key role={"÷"} />
      <Key role={"pi"} />
      <Key role={"cosine"} />
      <Key role={"log"} />
      <Key role={"4"} />
      <Key role={"5"} />
      <Key role={"6"} />
      <Key role={"×"} />
      <Key role={"e"} />
      <Key role={"tangent"} />
      <Key role={"sqrt"} />
      <Key role={"1"} />
      <Key role={"2"} />
      <Key role={"3"} />
      <Key role={"-"} />
      <Key role={"ANS"} />
      <Key role={"EXP"} />
      <Key role={"power"} />
      <Key role={"0"} />
      <Key role={"."} />
      <Eq role={"="} />
      <Key role={"+"} />
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
