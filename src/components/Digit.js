import styled from "styled-components";
import Key from "./Key";
const Digit = ({ digit }) => {
  return (
    <Key>
      <Container>{digit}</Container>
    </Key>
  );
};

export default Digit;

const Container = styled.div`
  line-height: 2.125rem;
  color: #e8eaed;
  background: #3c4043;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;
