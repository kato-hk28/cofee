import { websocketAtom } from "../state/websocket";
import { messageListAtom } from "../state/messages";
import { Message } from "../models/message";
import { useRecoilCallback, useRecoilValue } from "recoil";

export const useMessageList = (): Message[] => {
    const socket = useRecoilValue(websocketAtom);
    const messageList = useRecoilValue(messageListAtom);

    const updateMessageList = useRecoilCallback(
        ({ set }) => (message: Message) => {
            set(messageListAtom, [...messageList, message]);
        }
    );

    socket.onmessage = (msg) => {
        const content = JSON.parse(msg.data as string);
        const message: Message = { content: content };
        updateMessageList(message);
    }

    return messageList;
}