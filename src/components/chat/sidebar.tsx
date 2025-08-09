"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Chat } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function ChatSidebar({ chats }: { chats: Chat[] }) {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <h1 className="text-2xl font-bold text-center mt-2">AI Chat</h1>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <Link href="/chat" className="">
              <SquarePen className="size-4" /> Create New Chat
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats?.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/chat/${chat.id}`}
                      className={cn(
                        chat.id === chatId && "bg-secondary",
                        "truncate overflow-ellipsis w-64"
                      )}
                    >
                      {chat.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/logout">Logout</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
