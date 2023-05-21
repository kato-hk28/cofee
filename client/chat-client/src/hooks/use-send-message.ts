import { useCallback, useState } from "react";
import { websocketAtom } from "../state/websocket";
import { useRecoilValue } from "recoil";
import { Message } from "../models/message";
import { userAtom, volumeAtom } from "../state/messages";

export const useSendMessage = () => {
    const socket = useRecoilValue(websocketAtom);
    const [input, setInput] = useState<string>("");
    const user = useRecoilValue(userAtom);
    const volume = useRecoilValue(volumeAtom);
    

    const send = useCallback(() => {
        console.log("send");
        if (input.length === 0) return;
        const message: Message = { Method: "SendMsg", Message: input, User: user, Num: -1, Volume: volume + 1 };
        socket.send(JSON.stringify(message));
        setInput("");
    }, [input]);

    return {input, setInput, send};
}

