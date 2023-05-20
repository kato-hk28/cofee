import React from 'react'
import charimg from '../assets/character.jpeg'
import "./css/Character.css"
import { MessageLatest, messageLatestAtom } from "../state/messages"
import { useRecoilValue } from 'recoil';

export const Character = () => {
    return (
        <div>
        <center>
            <Comment />
            <img src={ charimg } id='character-icon' className='character-img'/>
        </center>
        </div>
    );
};

const Comment = () => {
    const messageLatest = useRecoilValue(messageLatestAtom);
    return (
        <div id='character-msg'>{ messageLatest.content }</div>
    )
}

export default Comment;
