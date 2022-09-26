import styled from "styled-components";
const Key = ({ role, style }) => {
  return (
    <Button style={style}>
      <div style={style}>{role}</div>
    </Button>
  );
};
export default Key;

const Button = styled.div`
  height: 2.25rem;
  background: #5f6368;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: Roboto, arial, sans-serif;
  color: #e8eaed;
  line-height: 2.125rem;
  text-align: center;

  cursor: pointer;

  div {
    border-radius: 4px;
  }
`;
