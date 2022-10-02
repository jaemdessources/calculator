import { useState } from "react";
import styled from "styled-components";

const AngleUnitSwitch = () => {
  const [AngleUnit, setAngleUnit] = useState("rad");
  const switchAngleUnit = () => {
    setAngleUnit(AngleUnit === "rad" ? "deg" : "rad");
  };
  return (
    <Container onClick={switchAngleUnit}>
      <Rad className={AngleUnit === "rad" ? "" : "off"}>Rad</Rad>
      <Divider></Divider>
      <Deg className={AngleUnit === "deg" ? "" : "off"}>Deg</Deg>
    </Container>
  );
};

export default AngleUnitSwitch;

const Container = styled.div`
  position: relative;
  grid-column: 1 / 3;
  height: 2.25rem;
  background: #5f6368;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: Roboto, arial, sans-serif;
  color: #e8eaed;
  line-height: 2.125rem;
  cursor: pointer;
  user-select: none;
`;
const Rad = styled.div`
  position: relative;
  left: 25%;
  transform: translateX(-50%);
  display: inline-block;
  width: 50%;
  text-align: center;
  &.off {
    color: #9aa0a6;
  }
`;
const Deg = styled.div`
  position: relative;
  display: inline-block;
  left: 25%;
  transform: translateX(-50%);
  width: 50%;
  text-align: center;
  &.off {
    color: #9aa0a6;
  }
`;

const Divider = styled.div`
  content: "";
  position: absolute;
  left: 50%;
  top: 0.625rem;
  bottom: 0.625rem;
  border-left: 0.125rem solid #bdc1c6;
  transform: translateX(-50%);
`;
