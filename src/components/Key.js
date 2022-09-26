import styled from "styled-components";
const Key = ({ children }) => {
  return <Button>{children}</Button>;
};
export default Key;

const Button = styled.div`
  height: 2.25rem;
  border-radius: 4px;
  font-family: Roboto, arial, sans-serif;
  text-align: center;
  cursor: pointer;
`;
