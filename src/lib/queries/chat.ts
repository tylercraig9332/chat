import { db } from "@/lib/drizzle";
import { Chat, chat } from "@/lib/schema";
import { eq, and, desc } from "drizzle-orm";
import { generateId } from "ai";

export async function selectChat(chatId: string) {
  const c = await db.select().from(chat).where(eq(chat.id, chatId));
  return c[0];
}

export async function insertChat(userId: string) {
  const existingEmptyChat = await db
    .select()
    .from(chat)
    .where(and(eq(chat.userId, userId), eq(chat.title, "New Untitled Chat")));
  if (existingEmptyChat.length > 0) {
    const c = await updateChat(existingEmptyChat[0].id, {
      createdAt: new Date(),
      visibility: "private" as const,
    });
    return c;
  }
  const c = await db
    .insert(chat)
    .values({
      id: generateId(),
      userId,
      title: "New Untitled Chat",
      createdAt: new Date(),
      visibility: "private" as const,
    })
    .returning();
  return c[0];
}

export async function updateChat(chatId: string, values: Partial<Chat>) {
  const c = await db
    .update(chat)
    .set(values)
    .where(eq(chat.id, chatId))
    .returning();
  return c[0];
}

export async function listChats(userId: string) {
  const c = await db
    .select()
    .from(chat)
    .where(eq(chat.userId, userId))
    .orderBy(desc(chat.createdAt));
  return c;
}
