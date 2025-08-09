import { getUser } from "@/actions/auth";
import { getChat } from "@/actions/chat";
import { getMessages } from "@/actions/message";
import Controller from "@/components/chat/controller";

export default async function Page({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const user = await getUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }
  const chatId = (await params).chatId;

  const chat = await getChat(chatId);
  if (!chat) {
    return <div>Chat not found</div>;
  }
  const { data: messages, error } = await getMessages(chatId);

  return <Controller chatId={chatId} initialMessages={messages ?? []} />;
}
