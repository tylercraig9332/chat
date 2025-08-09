import { getUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await getUser();
  if (user) {
    return redirect("/chat");
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold text-center w-full">
          Welcome to Chat
        </h1>
        <div className="flex gap-2 justify-center w-full">
          <Button className="w-32">Login</Button>
          <Button className="w-32">Signup</Button>
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
