import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

import io from 'socket.io-client';
import ChatMessage from './ChatMessage';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { MDBContainer } from 'mdbreact';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop'

export default function Chat() {
    const user = useSelector(state => state.user);
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const {projectId} = useParams();

    const sendMessage = (e) => {
        e.preventDefault();
        const messageContent = `\`\`\`javascript\nconst ${user.loginInfo.firstName}_${user.loginInfo.lastName}= \`${newMessage}\` //Sent @ ${moment().format("dddd, MMMM Do YYYY, h:mm a")}\n\`\`\``;
        const messagePayload = {
            content: messageContent,
            projectId: projectId
        }
        setNewMessage('');
        socketRef.current.emit("send project message", messagePayload)
    }
    
    useEffect(() => {

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
            //gets the latest messages and passes it through so they are updated
            setMessages(messages => messages.concat([payload]));
        })
    }, [projectId])

    return (
        <>
            <Navbar />
            <ScrollToTop />
            <MDBContainer 
            className="container-page-chat" style={{marginTop: '100px'}}>
            <h1 className="chat-title">Chat with the <span className="green-color">team</span> <i className="fas fa-comments "></i></h1>
                <div className="chat-box">
                    <div className="messages">
                        {messages.length > 0 && messages.map( (message, index) => {
                            return(
                                <ChatMessage key={index} message={message} />
                            )
                        })}
                    </div>
                    <form className="form-chat" onSubmit={sendMessage}>
            <div className="text-muted white pt-1 pb-2 ">
          <input type="text" value={newMessage} onChange={(e) => {setNewMessage(e.target.value)}} id="exampleForm2" className="form-control input-message" placeholder="Type a message..."/>
          <div>
            <><i className="fas fa-thumbs-up mr-2 blue-text"></i></>
            <><i className="far fa-laugh mr-2 amber-text"></i></>
            <><i className="fas fa-gamepad mr-2 purple-text"></i></>
            <><i className="fas fa-paperclip mr-2 black-text"></i></>
            <><i className="fas fa-camera mr-2"></i></>
            <button className="float-right btn btn-info btn-rounded btn-sm waves-effect waves-light" type="submit">Send</button>
          </div>
        </div>
                    </form>
                </div>
            </MDBContainer>
        <Footer />
        </>
    )
}
