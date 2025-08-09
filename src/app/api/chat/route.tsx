import { NextRequest } from "next/server";
import {
  streamText,
  convertToModelMessages,
  smoothStream,
  generateId,
} from "ai";
import { translateReasoningEffort } from "@/lib/models";
import { generateTitleFromUserMessage, getOrCreateChat } from "@/actions/chat";
import { updateChat } from "@/lib/queries/chat";
import { saveMessage } from "@/actions/message";

export async function POST(req: NextRequest) {
  try {
    const { messages, chatId, model, reasoningEffort } = await req.json();
    console.log("messages", messages);
    const lastMessage = messages[messages.length - 1];

    const chat = await getOrCreateChat(chatId);
    await saveMessage(chatId, lastMessage);

    if (chat.data?.title === "New Untitled Chat") {
      const title = await generateTitleFromUserMessage(lastMessage);
      await updateChat(chatId, { title }).catch((error) => {
        console.error(error);
      });
    }

    const stream = streamText({
      model: model,
      system: `You are a helpful assistant.`,
      messages: convertToModelMessages(messages),
      providerOptions: {
        ...(reasoningEffort &&
          translateReasoningEffort(model, reasoningEffort)),
      },
      experimental_transform: smoothStream(),
    });

    return stream.toUIMessageStreamResponse({
      originalMessages: messages,
      onFinish: async ({ responseMessage }) => {
        console.log(responseMessage);
        await saveMessage(chatId, {
          ...responseMessage,
          id: generateId(),
          metadata: {
            createdAt: new Date(),
            model: model,
            order: messages.length,
          },
        });
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to stream chat", { status: 500 });
  }
}
