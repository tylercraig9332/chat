import { UIMessage } from "@ai-sdk/react";
import { getUser } from "./auth";
import { insertMessage, selectMessages } from "@/lib/queries/message";

export async function saveMessage(chatId: string, newMessage: UIMessage) {
  const user = await getUser();
  if (!user) {
    return { data: null, error: "Unauthorized" };
  }
  console.log("newMessage", newMessage);
  const message = await insertMessage(chatId, newMessage);
  return { data: message, error: null };
}

export async function getMessages(chatId: string) {
  try {
    const user = await getUser();
    if (!user) {
      return { data: null, error: "Unauthorized" };
    }
    // TODO: Check if user is owner of chat messages or visible set to public
    const messages = await selectMessages(chatId);
    return { data: messages, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Failed to get messages" };
  }
}
