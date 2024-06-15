import { atom } from "recoil";

export const messageState = atom({
  key: "message",
  default: [],
});

export const nameState = atom({
  key: "name",
  default: "user01",
});

export const profileState = atom({
  key: "profile",
  default: "/img/profile_img.jpg",
});
