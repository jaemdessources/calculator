import styled from "styled-components";
import Key from "./Key";
const CE = () => {
  return (
    <Key>
      <Container>CE</Container>
    </Key>
  );
};

export default CE;

const Container = styled.div`
  background: #5f6368;
  line-height: 2.125rem;
  font-size: 0.875rem;
  color: #e8eaed;
  border-radius: 0.25rem;
`;
