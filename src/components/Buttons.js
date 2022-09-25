import styled from "styled-components";
import Key from "./Key";
const Buttons = () => {
  const AngleUnit = {
    rad: {
      position: "relative",
      transform: "translateX(25%)",
    },
    deg: {
      position: "relative",
      left: "75%",
      transform: "translateX(-25%)",
    },
  };
  return (
    <Container>
      <tbody>
        <tr>
          <td colSpan={2}>
            <KeyGroup>
              <Key style={AngleUnit.rad} role={"Rad"} />
              <Divider></Divider>
              <Key style={AngleUnit.deg} role={"Deg"} />
            </KeyGroup>
          </td>
          <td>
            <Key role={"factorial"} />
          </td>
          <td>
            <Key role={"("} />
          </td>
          <td>
            <Key role={")"} />
          </td>
          <td>
            <Key role={"%"} />
          </td>
          <td>
            <Key role={"CE"} />
          </td>
        </tr>
        <tr>
          <td>
            {" "}
            <Key role={"SHIFT"} />
          </td>
          <td>
            <Key role={"sine"} />
          </td>
          <td>
            {" "}
            <Key role={"ln"} />
          </td>

          <td>
            <Key role={"7"} />
          </td>
          <td>
            <Key role={"8"} />
          </td>
          <td>
            <Key role={"9"} />
          </td>
          <td>
            <Key role={"÷"} />
          </td>
        </tr>
        <tr>
          <td>
            <Key role={"pi"} />
          </td>
          <td>
            <Key role={"cosine"} />
          </td>
          <td>
            <Key role={"log"} />
          </td>
          <td>
            <Key role={"4"} />
          </td>
          <td>
            <Key role={"5"} />
          </td>
          <td>
            <Key role={"6"} />
          </td>
          <td>
            <Key role={"×"} />
          </td>
        </tr>
        <tr>
          <td>
            <Key role={"e"} />
          </td>
          <td>
            <Key role={"tangent"} />
          </td>
          <td>
            <Key role={"sqrt"} />
          </td>
          <td>
            <Key role={"1"} />
          </td>
          <td>
            <Key role={"2"} />
          </td>
          <td>
            <Key role={"3"} />
          </td>
          <td>
            <Key role={"-"} />
          </td>
        </tr>
        <tr>
          <td>
            <Key role={"ANS"} />
          </td>
          <td>
            <Key role={"EXP"} />
          </td>
          <td>
            <Key role={"power"} />
          </td>
          <td>
            <Key role={"0"} />
          </td>
          <td>
            <Key role={"."} />
          </td>
          <td>
            <Key role={"="} />
          </td>
          <td>
            <Key role={"+"} />
          </td>
        </tr>
      </tbody>
    </Container>
  );
};

export default Buttons;

const Container = styled.table`
  width: 100%;
`;
const KeyGroup = styled.div`
  position: relative;
`;
const Divider = styled.div`
  content: "";
  position: absolute;
  left: 50%;
  top: 1px;
  bottom: 1px;
  border-left: 1px solid #bdc1c6;
  transform: translateX(-50%);
`;
