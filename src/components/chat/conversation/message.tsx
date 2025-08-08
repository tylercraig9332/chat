"use client";

import {
    Reasoning,
    ReasoningContent,
    ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import { ChatStatus, UIMessage } from "ai";

export default function ConversationMessage({ message, status }: { message: UIMessage, status: ChatStatus }) {
    return (
        <Message from={message.role} key={message.id}>
            <MessageContent>
                {message.parts.map((part, i) => {
                    switch (part.type) {
                        case 'text':
                            return (
                                <Response key={`${message.id}-${i}`}>
                                    {part.text}
                                </Response>
                            );
                        case 'reasoning':
                            return (
                                <Reasoning
                                    key={`${message.id}-${i}`}
                                    className="w-full"
                                    isStreaming={status === 'streaming'}
                                >
                                    <ReasoningTrigger />
                                    <ReasoningContent>{part.text}</ReasoningContent>
                                </Reasoning>
                            );
                        default:
                            return null;
                    }
                })}
            </MessageContent>
        </Message>
    )
}