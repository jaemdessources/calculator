import { useRef } from "react";
import styled from "styled-components";

let inputFieldRef;
const InputField = () => {
  const InputRef = useRef(null);
  inputFieldRef = InputRef;
  return <Field ref={InputRef}>0</Field>;
};

export default InputField;
export { inputFieldRef };

const Field = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
  margin-right: 0.5rem;
  font-size: 30px;
  text-align: right;
  align-items: end;
  align-self: end;
  color: #e8eaed;
`;
