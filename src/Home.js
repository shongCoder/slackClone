import { styled } from "styled-components";
import Channel from "./Channel";

const Title = styled.h1`
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
`;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSide = styled.div`
  background-color: #0162f3;
  width: 300px;
  color: white;
  padding: 40px 20px 20px 30px;
  flex: none;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

function Home() {
  return (
    <Wrap>
      {/* 좌측 사이드 */}
      <LeftSide>
        <FlexBox justifyContent="space-between">
          <Title fontSize="24px">WorkSpace</Title>
          <button>edit</button>
        </FlexBox>
        <div style={{ marginTop: "80px" }}>
          <Title fontSize="16px">채널</Title>
          <ul style={{ marginLeft: "10px" }}>
            <li># One Channel</li>
            <li># One Channel</li>
            <li># One Channel</li>
          </ul>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "30px",
            width: "50px",
            height: "50px",
            backgroundColor: "white",
          }}
        >
          Profile
        </div>
      </LeftSide>
      {/* 좌측 사이드 */}
      {/* 센터 */}
      <Channel />
      {/* 센터 */}
    </Wrap>
  );
}

export default Home;
