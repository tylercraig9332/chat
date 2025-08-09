"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Loader } from "@/components/ai-elements/loader";
import SourcesSection from "./conversation/sources-section";
import ConversationMessage from "./conversation/message";
import { DefaultChatTransport } from "ai";
import ModelSelect from "./conversation/model-select";
import ReasoningSelect from "./conversation/reasoning-select";
import { useModel } from "@/hooks/model";
import { cn } from "@/lib/utils";
const Controller = ({
  chatId,
  initialMessages = [],
}: {
  chatId?: string;
  initialMessages?: UIMessage[];
}) => {
  const [input, setInput] = useState("");
  const { selectedModel, reasoningEffort } = useModel();
  const { messages, sendMessage, status } = useChat({
    id: chatId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        model: selectedModel.value,
        chatId: chatId,
        reasoningEffort: reasoningEffort,
      },
    }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({
        role: "user",
        parts: [{ type: "text", text: input }],
        metadata: {
          createdAt: new Date(),
          model: selectedModel.value,
          order: messages.length,
        },
      });
      setInput("");
    }
  };

  const isNewChat = messages.length === 0;

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div
        className={cn(
          isNewChat
            ? "flex flex-col justify-center gap-4 my-auto h-full mb-10"
            : "flex flex-col h-full"
        )}
      >
        {!isNewChat && (
          <Conversation className="h-full">
            <ConversationContent>
              {messages.map((message) => (
                <div key={message.id}>
                  <SourcesSection message={message} />
                  <ConversationMessage message={message} status={status} />
                </div>
              ))}
              {(status === "submitted" || status === "streaming") && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        )}

        {isNewChat && (
          <h1 className="text-center text-2xl font-bold">Welcome to Chat!</h1>
        )}
        <PromptInput
          onSubmit={handleSubmit}
          className={cn(isNewChat ? "justify-self-center" : "mt-4")}
        >
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <ModelSelect />
              <ReasoningSelect />
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default Controller;
