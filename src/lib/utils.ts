import type {
  UIMessage,
  UIMessagePart,
} from 'ai';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DBMessage } from "./schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToUIMessages(messages: DBMessage[]): UIMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: message.parts as UIMessagePart<any, any>[],
    metadata: {
      createdAt: new Date(message.createdAt),
      model: message.model,
      order: message.order,
    },
  }));
}
