import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import CodeBlock from './CodeBlock';

export default function ChatMessage({message}) {
    const user = useSelector(state => state.user);
    return (
        message.UserId === user.loginInfo.id ? 
        (<div>
            <ReactMarkdown source={message.content} renderers={{code: CodeBlock}} />
        </div>)
        :
        (<div className="d-flex justify-content-end">
            <ReactMarkdown source={message.content} renderers={{code: CodeBlock}} />
        </div>)
    )
}
