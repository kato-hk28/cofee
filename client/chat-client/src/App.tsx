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
      <Character />
      <MessageInput />
      <MessageList />
    </div>
  );
};

export default App;
