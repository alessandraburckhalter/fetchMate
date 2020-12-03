import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default function ChatMessage({message}) {
    return (
        <div>
            <ReactMarkdown source={message.content} renderers={{code: CodeBlock}} />
        </div>
    )
}
