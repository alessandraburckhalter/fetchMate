import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

import io from 'socket.io-client';
import ChatMessage from './ChatMessage';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { MDBContainer } from 'mdbreact';

const Demo_Test = 'Lets do this'; //Sent @ 9:35 pm

export default function Chat() {
    const user = useSelector(state => state.user);
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const initialValue = "```javascript\nconst "
    const middleValue = " = `"
    const endingValue = "```"
    const chatTime = `\` \/\/Sent @ ${moment().format("dddd, MMMM Do YYYY, h:mm a")}\n`
    //todo eventually will come from prop
    const {projectId} = useParams();
    // const projectId = 1;
    const sendMessage = (e) => {
        e.preventDefault();
        const sandwich = initialValue + user.loginInfo.firstName + '_' + user.loginInfo.lastName + middleValue + newMessage + chatTime + endingValue;
        const messagePayload = {
            content: sandwich,
            projectId: projectId
        }
        setNewMessage('');
        socketRef.current.emit("send project message", messagePayload)
    }
    
    useEffect(() => {
        //todo we need to eventually add a fetch call to a backend route that retrieves all of the old messages for a project chat room
        //todo this we be done using the projectId
        fetch(`/api/v1/chat/${projectId}`)
            .then(data => data.json())
            .then(chatMessages => {
                setMessages(chatMessages)
            })
            .catch(e => console.error(e))

        socketRef.current = io.connect(`/`);
        //* Immediately emits a join project room event, if the user is found as a member of that group
        //* Then it will join them to that group, if not, then they cannot see those chat messages
        socketRef.current.emit("join project room", projectId)
        socketRef.current.on('project message', payload => {
            console.log('Message recieved')
            //gets the latest messages and passes it through so they are updated
            setMessages(messages => messages.concat([payload]));
        })
    }, [])

    return (
        <>
            <Navbar />
            <MDBContainer style={{marginTop: '100px'}}>
                <div className="chat-box">
                    <div className="messages">
                        {messages.length > 0 && messages.map( (message, index) => {
                            return(
                                <ChatMessage key={index} message={message} />
                            )
                        })}
                    </div>
                    <form onSubmit={sendMessage}>
                        <input type='text'  value={newMessage} onChange={(e) => {setNewMessage(e.target.value)}} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </MDBContainer>
        </>
    )
}
