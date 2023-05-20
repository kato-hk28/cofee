import { useSendMessage } from "../hooks/use-send-message";
import "./css/MessageInput.css"

export const MessageInput = () => {
    const { input, setInput, send } = useSendMessage();

    return (
        <div style={{width: "80%", margin: "0 auto"}}>
            <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="new message"
                style={{width: "90%", height: "150px"}}
            />
        <button onClick={send} className="flatbutton"><span id="buttonImage"></span></button>
        </div>
    );
};