import styled from "styled-components";
import Key from "./Key";
const Sqrt = ({ inverse }) => {
  return (
    <Key>
      <Container className={inverse && "off"}>√</Container>
      <Container className={`${!inverse ? "off" : ""} inverse`}>
        x<sup>2</sup>
      </Container>
    </Key>
  );
};

export default Sqrt;

const Container = styled.div`
  background: #5f6368;
  line-height: 2.125rem;
  height: 100%;
  font-size: 0.875rem;
  color: #e8eaed;
  border-radius: 0.25rem;
  &:hover {
    background: #70757a;
  }
`;
