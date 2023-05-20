import { useState } from 'react'
import charimg from '../assets/character.jpeg'
import "./css/Character.css"
import { messageLatestAtom } from "../state/messages"
import { useRecoilValue } from 'recoil';

export const Character = (props) => {
    const [user, setUid] = useState(props.user);

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
    if(recieveMsg.User === props.user){
        return (
            <div id='character-msg'>{ recieveMsg.Message }</div>
        )
    }
    else{
        return (
            <div id='character-msg'></div>
        )
    }


}

export default Comment;
