import styled from "styled-components";

const AngleUnitSwitch = () => {
  return (
    <Container>
      <div className="rad">Rad</div>
      <Divider></Divider>
      <div className="deg">Deg</div>
    </Container>
  );
};

export default AngleUnitSwitch;

const Container = styled.div`
  grid-column: 1 / 3;
  height: 2.25rem;
  background: #5f6368;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: Roboto, arial, sans-serif;
  color: #e8eaed;
  line-height: 2.125rem;

  cursor: pointer;
  position: relative;

  .rad {
    position: relative;
    left: 25%;
    transform: translateX(-50%);
    display: inline-block;
    height: 100%;
    width: 50%;
    text-align: center;
  }
  .deg {
    position: relative;
    display: inline-block;
    left: 25%;
    transform: translateX(-50%);
    height: 100%;
    width: 50%;
    text-align: center;
  }
`;

const Divider = styled.div`
  content: "";
  position: absolute;
  left: 50%;
  top: 5px;
  bottom: 5px;
  border-left: 1px solid #bdc1c6;
  transform: translateX(-50%);
`;
