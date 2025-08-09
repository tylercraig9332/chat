import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  json,
  integer,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const chat = pgTable("chat", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt").notNull(),
  title: text("title").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable("message", {
  id: text("id").primaryKey().notNull(),
  chatId: text("chatId")
    .notNull()
    .references(() => chat.id),
  role: varchar("role").notNull(),
  parts: json("parts").notNull(),
  // Metadata fields below
  createdAt: timestamp("createdAt").notNull(),
  model: text("model").notNull(),
  order: integer("order").notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;
