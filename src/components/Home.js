import { useRecoilState, useRecoilValue } from "recoil";
import { messageState, nameState, profileState } from "../atom";
import { useForm } from "react-hook-form";

function Home() {
  const [message, setMessage] = useRecoilState(messageState);
  const name = useRecoilValue(nameState);
  const profile = useRecoilValue(profileState);

  const { register, setValue, handleSubmit } = useForm();
  const onSubmit = ({ message }) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    setMessage((oldMessage) => [
      { text: message, time: currentTime, id: Date.now(), name, profile },
      ...oldMessage,
    ]);
    setValue("message", "");
  };

  const onDelete = (id) => {
    setMessage((oldMessage) => {
      return oldMessage.filter((message) => message.id !== id);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("message", { required: true })}
          type="text"
          placeholder="텍스트를 입력하세요"
        ></input>
        <button type="submit">완료</button>
        <br />
        <br />
        {message.map((item) => (
          <>
            <div
              key={item.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img src={item.profile} width="40px" height="40px" />
              <div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "18px", fontWeight: "600" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: "14px", marginLeft: "5px" }}>
                    {item.time}
                  </p>
                </div>
                <p style={{ marginLeft: "10px" }}>{item.text}</p>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <button>수정</button>
                <button onClick={() => onDelete(item.id)}>삭제</button>
              </div>
            </div>
            <br />
          </>
        ))}
      </form>
    </>
  );
}

export default Home;
