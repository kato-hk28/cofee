import { websocketAtom } from "../state/websocket";
import { messageLatestAtom, messageListAtom } from "../state/messages";
import { Message } from "../models/message";
import { useRecoilCallback, useRecoilValue } from "recoil";

export const useMessageList = (): Message[] => {
    const socket = useRecoilValue(websocketAtom);
    const messageList = useRecoilValue(messageListAtom);
    const messageLatest = useRecoilValue(messageLatestAtom)

    const updateMessageList = useRecoilCallback(
        ({ set }) => (message: Message) => {
            set(messageListAtom, [...messageList, message]);
            set(messageLatestAtom, message);
        }
    );

    // socket.onmessage = (msg) => {
    //     console.log("onmessage");
    //     const msg_json = JSON.parse(msg.data as string);
    //     console.log(msg_json);
    //     const message: Message = { Method: msg_json["Method"],  Message: msg_json["Message"], User: msg_json["User"], Num: msg_json["Num"] }; // TODO:useridを変える
    //     updateMessageList(message);
    // }

    return messageList;
}