import { getUser } from "@/actions/auth";
import { getOrCreateChat } from "@/actions/chat";
import Controller from "@/components/chat/controller";

export default async function ChatPage() {
  const user = await getUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }

  const { data: chat, error } = await getOrCreateChat();

  return (
    <div>
      <Controller chatId={chat?.id} />
    </div>
  );
}
