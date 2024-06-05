import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { messageState, nameState, profileState } from "../atom";
import { useForm } from "react-hook-form";

function MessageForm() {
  const [message, setMessage] = useRecoilState(messageState);
  const [edit, setEdit] = useState(null);
  const [editMessage, setEditMessage] = useState("");
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

  const onEdit = (id) => {
    setEdit(id);
    const editText = message.find((item) => item.id == id).text;
    setEditMessage(editText);
  };

  const onEditSubmit = (event) => {
    event.preventDefault();
    setMessage((oldMessage) =>
      oldMessage.map((item) =>
        item.id == edit ? { ...item, text: editMessage } : item
      )
    );
    setEdit(null);
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
      {message.map((item) => (
        <>
          <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
            <img src={item.profile} width="40px" height="40px" />
            {edit == item.id ? (
              <>
                <form onSubmit={onEditSubmit}>
                  <input
                    type="text"
                    value={editMessage}
                    placeholder="메세지를 입력하세요"
                    onChange={(e) => setEditMessage(e.target.value)}
                  ></input>
                  <div style={{ marginLeft: "10px" }}>
                    <button type="submit">완료</button>
                    <button onClick={() => setEdit(null)}>취소</button>
                  </div>
                </form>
              </>
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
          <br />
        </>
      ))}
    </>
  );
}

export default MessageForm;
