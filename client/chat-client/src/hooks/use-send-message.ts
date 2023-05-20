import { useCallback, useState } from "react";
import { websocketAtom } from "../state/websocket";
import { useRecoilValue } from "recoil";
import { Message } from "../models/message";

export const useSendMessage = () => {
    const socket = useRecoilValue(websocketAtom);
    const [input, setInput] = useState<string>("");
    var user = 1;

    const send = useCallback(() => {
        if (input.length === 0) return;
        const message: Message = { content: input, user: user };
        socket.send(JSON.stringify(message));
        setInput("");
    }, [input]);

    return {input, setInput, send};
}

