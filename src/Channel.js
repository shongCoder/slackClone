import { styled } from "styled-components";

const Title = styled.h1`
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

function Channel() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#eceded",
        overflow: "hidden",
      }}
    >
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
      <div
        style={{
          display: "flex",
          padding: "16px",
          backgroundColor: "white",
          margin: "30px",
        }}
      >
        <div
          style={{ width: "40px", height: "40px", backgroundColor: "gray" }}
        ></div>
        <div>
          <Title fontSize="18px">Name</Title>
          <p>Lorem ipsum dolor sit amet, consectetuer</p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          backgroundColor: "white",
          height: "160px",
          margin: "0 30px",
          boxShadow: "0px 10px 18px rgba(0, 0, 0, 0.05)",
        }}
      ></div>
    </div>
  );
}

export default Channel;
