import styled from "styled-components";
import Key from "./Key";
const Tan = () => {
  return (
    <Key>
      <Container>Tan</Container>
    </Key>
  );
};

export default Tan;

const Container = styled.div`
  background: #5f6368;
  line-height: 2.125rem;
  height: 100%;
  font-size: 0.875rem;
  color: #e8eaed;
  border-radius: 0.25rem;
`;
