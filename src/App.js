import { useState } from "react";
import Buttons from "./components/Buttons";
import InputField from "./components/InputField";
import HistoryIcon from "./icons/HistoryIcon";
import logo from "./icons/ico128.png";
import styled from "styled-components";
import "./App.css";

function App() {
  const [clickedButton, setClickedButton] = useState(null);
  const btnClick = (btn) => setClickedButton({ btn });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>The calculator</h1>
      </header>
      <main>
        <StyledContainer>
          <StyledDisplay tabIndex={0}>
            <HistoryIcon />
            <StyledSecondaryField>Ans = </StyledSecondaryField>
            <InputField clickedButton={clickedButton} />
          </StyledDisplay>
          <Buttons handleClick={btnClick} />

          <hr />
        </StyledContainer>
      </main>
    </div>
  );
}

export default App;

const StyledContainer = styled.div`
  width: 40.75rem;
  margin: 2rem auto;

  hr {
    margin: auto;
  }
`;

const StyledDisplay = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  grid-template-rows: 30% 70%;
  width: 100%;
  height: 4.5rem;
  padding: 0.5rem 0.75rem 0.25rem 0.5rem;
  border: 1px solid #3c4043;
  border-radius: 0.6rem;
  overflow: hidden;
  &:hover {
    background: #303134;
    border: 0.075rem solid #303134;
  }

  &:focus {
    border: 1px solid #8ab4f8;
  }
`;

const StyledSecondaryField = styled.span`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  text-align: right;
  width: 100%;
  font-size: 0.8rem;
  color: #969ba1;
  overflow: hidden;
`;
