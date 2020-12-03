import React, { useEffect, useRef, useState } from 'react'


import io from 'socket.io-client';

export default function Chat() {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    //todo eventually will come from prop
    const projectId = 1;
    const sendMessage = (e) => {
        e.preventDefault();
        const messagePayload = {
            body: newMessage,
            projectId: projectId
        }
        setNewMessage('');
        socketRef.current.emit("send project message", messagePayload)
    }
    
    useEffect(() => {
        //todo we need to eventually add a fetch call to a backend route that retrieves all of the old messages for a project chat room
        //todo this we be done using the projectId
        socketRef.current = io.connect(`/`);
        //* Immediately emits a join project room event, if the user is found as a member of that group
        //* Then it will join them to that group, if not, then they cannot see those chat messages
        socketRef.current.emit("join project room", projectId)
        socketRef.current.on('project message', payload => {
            //gets the latest messages and passes it through so they are updated
            setMessages(messages => messages.concat([payload]));
        })
    }, [])

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
