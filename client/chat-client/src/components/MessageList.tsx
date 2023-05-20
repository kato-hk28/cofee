import { useRecoilValue } from "recoil";
import { messageListAtom } from "../state/messages";


export const MessageList = () => {
    const messageList = useRecoilValue(messageListAtom);

    return (
        <div>
            {messageList.map((m, i) => (
                <div key={i}>{m.Message}</div>
            ))}
        </div>
    );
};