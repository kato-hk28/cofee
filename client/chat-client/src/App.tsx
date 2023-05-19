import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { MessageInput } from "./components/MessageInput";
import { MessageList } from "./components/MessageList";

function App() {
  return (
    <div>
      <h1>Simple Chat</h1>
      <MessageInput />
      <MessageList />
    </div>
  );
};

export default App;