import { useRecoilState } from "recoil";
import { messageState } from "../atom";

function Home() {
  const [message, setMessage] = useRecoilState(messageState);

  const onChange = (event) => {
    setMessage(event.target.value);
    console.log(message);
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={onChange}
        placeholder="텍스트를 입력하세요"
      ></input>
      <button>완료</button>
      <br />
      {message}
    </div>
  );
}

export default Home;
