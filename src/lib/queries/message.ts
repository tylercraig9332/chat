import { db } from "../drizzle";
import { message } from "../schema";
import { UIMessage } from "ai";
import { convertToDBMessage, convertToUIMessages } from "../utils";
import { eq } from "drizzle-orm";

export async function insertMessage(chatId: string, newMessage: UIMessage) {
  const dbMessage = convertToDBMessage(chatId, newMessage);
  const m = await db.insert(message).values(dbMessage);
  return m;
}

export async function selectMessages(chatId: string) {
  const messages = await db
    .select()
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(message.order);
  return convertToUIMessages(messages);
}
