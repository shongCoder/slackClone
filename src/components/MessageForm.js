import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { messageState, nameState, profileState } from "../atom";
import { useForm } from "react-hook-form";

function MessageForm() {
  const [message, setMessage] = useRecoilState(messageState);
  const [edit, setEdit] = useState(false);
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

  const onEdit = (event) => {
    event.preventDefault();
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const onEditing = (event) => {
    setEditMessage(event.target.value);
  };

  const onEditSubmit = (event) => {
    const newMessage = message.map((item) => ({
      ...item,
      text: item.id == event.id ? editMessage : item.text,
    }));
    setMessage(newMessage);
    setEdit(false);
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
            {edit ? (
              <>
                <form onSubmit={handleSubmit(onEditSubmit)}>
                  <input
                    {...register("editMessage")}
                    type="text"
                    value={editMessage}
                    placeholder="메세지를 입력하세요"
                    onChange={onEditing}
                  ></input>
                  <div style={{ marginLeft: "10px" }}>
                    <button type="submit">완료</button>
                    <button onClick={onEdit}>취소</button>
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
                  <button onClick={onEdit}>수정</button>
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
