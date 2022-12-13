import { useRef, useEffect } from "react";
import styled from "styled-components";
import input from "../lib/input";
const InputField = ({ clickedButton }) => {
  const InputRef = useRef(null);
  useEffect(() => {
    // every time clicked button has a new value we update the display
    // imperatively with the input function.
    input(clickedButton?.btn, InputRef);
  }, [clickedButton]);

  return (
    <Field>
      <div id="mainField" ref={InputRef}>
        0
      </div>
    </Field>
  );
};

export default InputField;

const Field = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 0.5rem;
  font-size: 30px;
  text-align: right;
  align-items: end;
  align-self: end;
  color: #e8eaed;
  div {
    float: right;
  }
`;
