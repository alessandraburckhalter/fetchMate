import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

import io from 'socket.io-client';

export default function Chat() {
    const socketRef = useRef();
    const [yourId, setYourId] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const user = useSelector(state => state.user);
    
    const sendMessage = (e) => {
        e.preventDefault();
        const messagePayload = {
            body: newMessage,
            id: yourId,
            //todo eventually need below
            //projectId: projectId
        }
        setNewMessage('');
        socketRef.current.emit("send project message", messagePayload)
    }
    
    useEffect(() => {
        //todo we need to eventually add a fetch call to a backend route that retrieves all of the old messages for a project chat room
        socketRef.current = io.connect('/')

        socketRef.current.on('your id', id => {
            setYourId(id)
        })

        socketRef.current.on('project message', payload => {
            setMessages([...messages].concat(payload));
        })
    }, [messages])

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map( (message, index) => {
                    return(
                        <div key={index}>
                            {message.body}
                        </div>
                    )
                })}
            </div>
            <form onSubmit={sendMessage}>
                <input type='textArea' value={newMessage} onChange={(e) => {setNewMessage(e.target.value);}} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
