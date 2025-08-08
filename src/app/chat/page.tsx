import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Controller from "@/components/chat/controller";

export default async function ChatPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        return <div>Unauthorized</div>;
    }

    console.log(session)


    return <div>
        <Controller chatId="1" />
    </div>;
}