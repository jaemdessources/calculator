import { useState } from "react";
import styled from "styled-components";
const Key = ({ children }) => {
  const [focus, setFocus] = useState(false);

  //click effect
  const mouseDownHandler = (e) => {
    if (e.target.id !== "shift") setFocus(true);
  };
  const mouseUpHandler = (e) => {
    setFocus(false);
  };

  return (
    <Button
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      className={focus && "focus"}
    >
      {children}
    </Button>
  );
};
export default Key;

const Button = styled.div`
  height: 2.25rem;
  border-radius: 0.25rem;
  font-family: Roboto, arial, sans-serif;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: none;
  &.focus {
    border: 0.0375rem solid #a7a7a7;
  }
`;
