import styled from "styled-components";
import Key from "./Key";
const Eq = () => {
  return (
    <Key>
      <Container>=</Container>
    </Key>
  );
};

export default Eq;

const Container = styled.div`
  line-height: 2.125rem;
  color: #202124;
  background: #8ab4f8;
  font-weight: bold;
  border-radius: 0.25rem;
`;
