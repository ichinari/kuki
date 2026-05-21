import { redirect } from "next/navigation";
import SignoutButton from "@/components/SignoutButton";
import { createClient } from "@/utils/supabase/server";
import { ROUTES } from "@/routes/route";

export default async function Home() {
  // DOM レンダリング前にサーバー側で認証チェック → 未ログインならログインページへ
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.LOGIN.path);
  }

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      {/* SP */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold">SP KUKIへようこそ</h1>
      </div>

      {/* PC */}
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold">PC KUKIへようこそ</h1>
      </div>
      <SignoutButton />
    </main>
  );
}
