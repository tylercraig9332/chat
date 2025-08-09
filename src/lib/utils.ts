/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UIMessage, UIMessagePart } from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DBMessage } from "./schema";
import { generateId } from "ai";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToUIMessages(messages: DBMessage[]): UIMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as "user" | "assistant" | "system",
    parts: message.parts as UIMessagePart<any, any>[],
    metadata: {
      createdAt: message.createdAt,
      model: message.model,
      order: message.order,
    },
  }));
}

export type MessageMetadata = {
  createdAt: Date;
  model: string;
  order: number;
};

export function convertToDBMessage(
  chatId: string,
  message: UIMessage
): DBMessage {
  const metadata = message.metadata as MessageMetadata;
  return {
    id: message?.id?.length > 0 ? message.id : generateId(),
    chatId,
    role: message.role,
    parts: message.parts,
    createdAt:
      metadata.createdAt instanceof Date
        ? metadata.createdAt
        : new Date(metadata.createdAt),
    model: metadata.model,
    order: metadata.order,
  };
}
