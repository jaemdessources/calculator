import InputField from "./InputField";
import styled from "styled-components";
import historyIcon from "../icons/history.svg";
const Display = () => {
  return (
    <Container>
      <HistoryIcon src={historyIcon} alt="history" />
      <Secondary>2 + 2</Secondary>
      <InputField />
    </Container>
  );
};

export default Display;

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  grid-template-rows: 30% 70%;
  width: 100%;
  height: 4.5rem;
  padding: 0.5rem;
  border: 1px solid #3c4043;
  border-radius: 0.6rem;
  overflow: hidden;
`;

const HistoryIcon = styled.img`
  height: 1rem;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: #9aa0a6;
  cursor: pointer;
`;

const Secondary = styled.span`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  text-align: right;
  width: 100%;
  font-size: 0.8rem;
  color: #969ba1;
  overflow: hidden;
`;
