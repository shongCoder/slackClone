import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { messageState, nameState, profileState } from "../atom";
import { useForm } from "react-hook-form";
import { addMessage, getMessages, delMessage, editMessage } from "../api";

function MessageForm() {
  const [message, setMessage] = useRecoilState(messageState);
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState("");
  const name = useRecoilValue(nameState);
  //const profile = useRecoilValue(profileState);
  const { register, setValue, handleSubmit } = useForm();

  // const onSubmit = ({ message }) => {
  //   const now = new Date();
  //   const hours = now.getHours().toString().padStart(2, "0");
  //   const minutes = now.getMinutes().toString().padStart(2, "0");
  //   const currentTime = `${hours}:${minutes}`;

  //   setMessage((oldMessage) => [
  //     { text: message, time: currentTime, id: Date.now(), name, profile },
  //     ...oldMessage,
  //   ]);
  //   setValue("message", "");
  // };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        setMessage(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [setMessage]);

  const onSubmit = async ({ message: newMessage }) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    try {
      await addMessage({
        id: Date.now(),
        text: newMessage,
        name: name,
        time: currentTime,
      });
      const response = await getMessages();
      setMessage(response.data);
      setValue("message", "");
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  // const onDelete = (id) => {
  //   setMessage((oldMessage) => {
  //     return oldMessage.filter((message) => message.id !== id);
  //   });
  // };

  const onDelete = async (id) => {
    try {
      await delMessage(id);
      setMessage((oldMessage) => {
        return oldMessage.filter((message) => message.id !== id);
      });
    } catch (error) {
      console.log("Error delelting message", error);
    }
  };

  const onEdit = (id) => {
    setEdit(id);
    const editText = message.find((item) => item.id == id).text;
    setEditText(editText);
  };

  // const onEditSubmit = (event) => {
  //   event.preventDefault();
  //   setMessage((oldMessage) =>
  //     oldMessage.map((item) =>
  //       item.id == edit ? { ...item, text: editMessage } : item
  //     )
  //   );
  //   setEdit(null);
  // };

  const onEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await editMessage(edit, editText);
      const response = await getMessages();
      setMessage(response.data);
      setEdit(null);
    } catch (error) {
      console.log("Error editing message", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("message")}
          type="text"
          placeholder="메세지를 입력하세요"
        ></input>
        <button type="submit">완료</button>
        <br />
        <br />
      </form>
      {message && message.length > 0 ? ( // 조건부 렌더링 추가
        message.map((item) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
            <img src={item.profile} width="40px" height="40px" alt="profile" />
            {edit === item.id ? (
              <form onSubmit={onEditSubmit}>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    value={editText}
                    placeholder="메세지를 입력하세요"
                    onChange={(e) => setEditText(e.target.value)}
                  ></input>
                  <div style={{ marginLeft: "10px" }}>
                    <button type="submit">완료</button>
                    <button onClick={() => setEdit(null)}>취소</button>
                  </div>
                </div>
              </form>
            ) : (
              <>
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
                  <button onClick={() => onEdit(item.id)}>수정</button>
                  <button onClick={() => onDelete(item.id)}>삭제</button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>메세지가 없습니다.</p> // 데이터가 없을 때 보여줄 메시지 추가
      )}
    </>
  );
}

export default MessageForm;
