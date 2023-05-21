import { useSendMessage } from "../hooks/use-send-message";
import sendimg from "../assets/send.png"
import "./css/MessageInput.css"

export const MessageInput = () => {
    const { input, setInput, send } = useSendMessage();

    return (
        <div style={{width: "80%", margin: "0 auto"}}>
            <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="new message"
                style={{width: "90%", height: "100px"}}
            />
        <button onClick={send} className="flatbutton"><img src={sendimg} style={{zoom: 0.1, marginLeft: '80px'}}/></button>
        </div>
    );
};