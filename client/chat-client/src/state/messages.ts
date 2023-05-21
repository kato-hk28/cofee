import { Message } from "../models/message";
import { atom } from "recoil";

export const messageListAtom = atom<Message[]>({
    key: "messageList",
    default: [],
});

// export const messageLatestAtom = atom<Message>({
//     key: "messageLatest",
//     default: {Method: "", Message: "",  User: -1, Num: -1},
// });

export const messageLatestAtom = atom<Message[]>({
    key: "messageLatest",
    default: [],
});

export const userAtom = atom<Number>({
    key: "user",
    default: -1
});

export const characterAtom = atom<Number>({
    key: "caracter",
    default: 0,
});