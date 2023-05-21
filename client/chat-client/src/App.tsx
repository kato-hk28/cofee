import { useEffect, useState } from 'react'
import './App.css'
import { MessageInput } from "./components/MessageInput";
import { MessageList } from "./components/MessageList";
import { Character } from "./components/Character";
import * as WebSocket from "websocket"
import { useRecoilState } from 'recoil';
import { websocketAtom } from './state/websocket';
import { Message } from './models/message';
import { characterAtom, messageLatestAtom, messageListAtom, userAtom, volumeAtom } from './state/messages';
import coffeeimg from './assets/coffee.svg'
import * as React from 'react';
import { motion } from "framer-motion"


function App() {
  const [, setSocket] = useRecoilState(websocketAtom);
  const [user, setUser] = useRecoilState(userAtom)
  const [latest, setLatest] = useRecoilState(messageLatestAtom);
  const [messageList,setList] = useRecoilState(messageListAtom);
  const [charnum, setChar] = useRecoilState(characterAtom);
  const [Volume, setVolume] = useRecoilState(volumeAtom);

  useEffect (() => {
    (async() => {
      var socket = await connect()
      let Iam : Number;
      setSocket(socket);
      var ml: Message[] = [];
      var vol: number = 0;

      socket.onmessage = (msg) => {
        console.log("use effect on message");
        const msg_json = JSON.parse(msg.data as string);
        console.log(msg_json);
        const message: Message = { Method: msg_json["Method"],  Message: msg_json["Message"], User: msg_json["User"], Num: msg_json["Num"], Volume: msg_json["Volume"] };

        if(message.Method === "GetMe"){
          setUser(msg_json["User"]);
          Iam = message.User;
          setChar(message.Num);
        }

        if(message.Method === "SendMsg"){
          console.log(Iam);
          ml = ml.slice(0, message.User).concat(message).concat(ml.slice(message.User, -1))
          setLatest(ml);
          vol = message.Volume;
          setVolume(vol);
        }

        if(message.Method === "SetNum"){
          console.log("SendNum");
          setChar(message.Num);
        }

        if(message.Method === "Disconnect"){
          console.log("disconnect")
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
    <div style={{width: "100%", height: "100%"}}>
      <img src={coffeeimg} style={{ zoom: 0.7, position: 'fixed', inset: 0, margin: 'auto'}}/>
      <motion.div
        id="blank-box"
        style={{ 
          position: 'fixed',
          inset: 0,
          marginTop: 240 - Volume*20 + 'px',
          width: '190px',
          height:'340px',
          // backgroundColor:'white',
          backgroundColor:'white',
          marginRight: '45.8%',
          marginLeft: 'auto',
        }}
          // animate={{
          //   y: -400
          // }}
          // transition={{
          //   duration: 30
          // }}
        />
      <div style={{ textAlign: 'center', padding: '300px 0', height: '500px' }}>
      <Characters />
      </div>
      <center style={{ position: "absolute", bottom: "0", width: "100%"}}>
      <MessageInput />

      </center>
    </div>
  );
};

const Characters = () => {
  const [charnum, setCharnum] = useRecoilState(characterAtom);

  const chars = [];

  for(var i = 0; i < charnum; i++){
    chars.push(<div style={{position: 'fixed', inset: 0, margin: 'auto'}}><Character user={i}/></div>);
  };

  return (
    <>
    <div>{ chars }</div>
    </>
  );
}

export default App;
