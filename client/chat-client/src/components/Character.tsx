import { useState } from 'react'
import charimg from '../assets/character.jpeg'
import "./css/Character.css"
import { messageLatestAtom } from "../state/messages"
import { useRecoilValue } from 'recoil';
import ReactDOM from 'react-dom';
import { motion } from "framer-motion"

function genRandomArray(rate, rate2){
    let array = [];
    let length = 30;
    for (let i = 0; i < length + rate * 3; i++){
        array.push(Math.random() * 100 * rate2 - rate2 / 2 * 100);
    }
    return array;
}


export const Character = (props) => {
    const [user, setUid] = useState(props.user);
    const variants = {
        transition: {x: genRandomArray(user+1, 8), y: genRandomArray(user+1, 3)}
    }
    
    return (
        <>
        <motion.div
            style={{}}
            animate="transition"
            variants={variants}
            transition={{
                repeat: Infinity,
                duration: 100,
                repeatType: "mirror",
                
                // type: "spring",
                // damping: 3
            }}
        >
        <Comment user={ props.user }/>
        <img src={ charimg } id='character-icon' className='character-img' style={{zoom: 0.5}}/>
        </motion.div>
        </>
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
            <div></div>
        )
    }


}

export default Comment;
