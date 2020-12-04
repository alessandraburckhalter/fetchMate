import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import CodeBlock from './CodeBlock';
import '../styles/chat.css';

export default function ChatMessage({message}) {
    const user = useSelector(state => state.user);
    return (
        message.UserId === user.loginInfo.id ? 
        (<div>
            <ReactMarkdown source={message.content} renderers={{code: CodeBlock}} />
        </div>)
        :
        (<div className="d-flex another-user">
            <ReactMarkdown source={message.content} renderers={{code: CodeBlock}} />
        </div>)
    )
}
