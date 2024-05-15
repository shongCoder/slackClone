import { styled } from "styled-components";

const Title = styled.h1`
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
`;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSide = styled.div`
  background-color: blue;
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
        <div>
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
      <div style={{ width: "100%", backgroundColor: "#eceded" }}>
        <div
          style={{
            height: "140px",
            backgroundColor: "white",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <FlexBox justifyContent="center">
            <input
              type="text"
              placeholder="검색"
              style={{ width: "50%" }}
            ></input>
          </FlexBox>
          <FlexBox>
            <Title fontSize="22px"># Two channel</Title>
            <p>Channel introduce editable</p>
            <button>edit</button>
          </FlexBox>
        </div>
      </div>
      {/* 센터 */}
    </Wrap>
  );
}

export default Home;
