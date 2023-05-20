import { useState } from 'react'
import './App.css'
import { MessageInput } from "./components/MessageInput";
import { MessageList } from "./components/MessageList";
import { Character } from "./components/Character";
import React from 'react';

function App() {
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
  var characters = [<Character />, <Character />] 

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
