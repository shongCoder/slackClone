import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "messageLocal",
  storage: localStorage,
});

export const messageState = atom({
  key: "message",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const nameState = atom({
  key: "name",
  default: "Name",
});

export const profileState = atom({
  key: "profile",
  default: "/img/profile_img.jpg",
});
