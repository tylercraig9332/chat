import { db } from "@/lib/drizzle";
import { chat } from "@/lib/schema";
import { getUser } from "./auth";
import {
  insertChat,
  listChats,
  selectChat,
  updateChat as updateChatQuery,
} from "@/lib/queries/chat";
import { generateText } from "ai";
import { DEFAULT_SERVICE_MODEL } from "@/lib/models";
import { UIMessage } from "@ai-sdk/react";

export async function getChat(chatId: string) {
  try {
    const user = await getUser();
    if (!user) {
      return { data: null, error: "Unauthorized" };
    }
    const c = await selectChat(chatId);
    if (c.userId !== user.id && c.visibility === "private") {
      return { data: null, error: "Unauthorized" };
    }
    return { data: c, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function createChat() {
  const user = await getUser();
  if (!user) {
    return { data: null, error: "Unauthorized" };
  }
  try {
    const c = await insertChat(user.id);
    return { data: c, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function getOrCreateChat(chatId?: string) {
  if (!chatId) {
    return await createChat();
  }
  return await getChat(chatId);
}

export async function updateChat(
  chatId: string,
  title?: string,
  visibility?: "public" | "private"
) {
  const user = await getUser();
  if (!user) {
    return { data: null, error: "Unauthorized" };
  }
  try {
    const c = await updateChatQuery(chatId, { title, visibility });
    if (!c) {
      return { data: null, error: "Chat not found" };
    }
    return { data: c, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function getUserChats() {
  const user = await getUser();
  if (!user) {
    return { data: null, error: "Unauthorized" };
  }
  try {
    const c = await listChats(user.id);
    return { data: c, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function generateTitleFromUserMessage(message: UIMessage) {
  const { text: title } = await generateText({
    model: DEFAULT_SERVICE_MODEL.value,
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}
