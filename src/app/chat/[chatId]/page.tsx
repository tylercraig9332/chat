import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page({
    params,
}: {
    params: { chatId: string };
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return <div>Chat Page {params.chatId}</div>;
}