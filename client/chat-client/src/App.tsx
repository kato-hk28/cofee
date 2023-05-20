import { useEffect, useState } from 'react'
import './App.css'
import { MessageInput } from "./components/MessageInput";
import { MessageList } from "./components/MessageList";
import { Character } from "./components/Character";
import * as WebSocket from "websocket"
import { useRecoilState } from 'recoil';
import { websocketAtom } from './state/websocket';
import { Message } from './models/message';
import { messageLatestAtom, messageListAtom, userAtom } from './state/messages';


function App() {
  const [, setSocket] = useRecoilState(websocketAtom);
  const [user, setUser] = useRecoilState(userAtom)
  const [latest, setLatest] = useRecoilState(messageLatestAtom);
  const [messageList,setList] = useRecoilState(messageListAtom);

  useEffect (() => {
    (async() => {
      var socket = await connect()
      setSocket(socket);
      console.log("useEffect");
      socket.onmessage = (msg) => {
        console.log("use effect on message");
        const msg_json = JSON.parse(msg.data as string);
        console.log(msg_json);
        const message: Message = { Method: msg_json["Method"],  Message: msg_json["Message"], User: msg_json["User"], Num: msg_json["Num"] };

        if(message.Method === "GetMe"){
          setUser(msg_json["User"]);
        }

        if(message.Method === "SendMsg"){
          setLatest(message);
          setList([...messageList, message]);
        }
      }
    })()
  }, []);

  const connect = (): Promise<WebSocket.w3cwebsocket> => {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket.w3cwebsocket("ws://localhost:80/ws");
        socket.onopen = () => {
            console.log("connected");
            resolve(socket);
        };
        socket.onclose = () => {
            console.log("reconnecting...");
            connect();
        };
        socket.onerror = (err) => {
            console.log("connection error:", err);
            reject(err);
        };
    })
}

  return (
    <div>
      <h1>Simple Chat</h1>
      <Characters />
      <MessageInput />
      <MessageList />
    </div>
  );
};

const Characters = () => {
  var characters = [<Character user={0}/>, <Character user={1}/>] 

  const chars = [];

  for(const [i, character] of characters.entries()){
    chars.push(<div>{character}</div>);
  };

  return (
    <>
    <div>{ chars }</div>
    </>
  );
}

export default App;
