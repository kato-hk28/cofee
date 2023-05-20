import React, { useState } from 'react'
import charimg from '../assets/character.jpeg'
import "./css/Character.css"
import { MessageLatest, messageLatestAtom } from "../state/messages"
import { useRecoilValue } from 'recoil';

export const Character = (props) => {
    const [visible, changeVisible] = useState(true);
    const [user, setUid] = useState(props.user);
    const [latest, setLatest] = useState("");

    return (
        <div>
        <center>
            <Comment user={ props.user }/>
            <p>{ user }</p>
            <img src={ charimg } id='character-icon' className='character-img'/>
        </center>
        </div>
    );
};

const Comment = (props) => {
    const recieveMsg = useRecoilValue(messageLatestAtom);
    if(recieveMsg.user === props.user){
        return (
            <div id='character-msg'>{ recieveMsg.content }</div>
        )
    }
    else{
        return (
            <div id='character-msg'></div>
        )
    }


}

export default Comment;
