import styled from "styled-components";
import Key from "./Key";
const DecimalPoint = () => {
  return (
    <Key>
      <Container>
        <div>.</div>
      </Container>
    </Key>
  );
};

export default DecimalPoint;

const Container = styled.div`
  position: relative;
  height: 2.125rem;
  line-height: 2.125rem;
  background: #3c4043;
  border-radius: 0.25rem;
  font-size: 1.125rem;
  font-weight: bold;
  div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    background-color: #e8eaed;
    border-radius: 50%;
    height: 0.25rem;
    width: 0.25rem;
    margin: auto;
  }
`;
