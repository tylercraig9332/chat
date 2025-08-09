import { getUser } from "@/actions/auth";
import { getUserChats } from "@/actions/chat";
import { ChatSidebar } from "@/components/chat/sidebar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: chats, error } = await getUserChats();
  return (
    <SidebarProvider>
      <ChatSidebar chats={chats ?? []} />
      <div className="flex-1">{children}</div>
    </SidebarProvider>
  );
}
