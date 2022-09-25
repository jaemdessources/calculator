import styled from "styled-components";
const Key = ({ role }) => {
  return <Button>{role}</Button>;
};
export default Key;

const Button = styled.div`
  display: inline-block;
`;
