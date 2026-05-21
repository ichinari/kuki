"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/route";
import { useUserContext } from "@/contexts/UserProvider";
import SignoutButton from "@/components/SignoutButton";

export default function OwnerTop({
  params,
}: {
  params: Promise<{ ownerId: string }>;
}) {
  const { ownerId } = use(params);
  const router = useRouter();
  const { user, isLoading } = useUserContext();

  useEffect(() => {
    // UserProvider のロード完了を待つ
    if (isLoading) return;

    // 未ログイン or profiles 未取得 / owner でない → ログインへ
    if (!user || !user.memberId || !user.roleType) {
      router.replace(ROUTES.LOGIN.path);
      return;
    }

    // URL の ownerId と自分の member_id が一致しない → ホームへ (不正アクセス防止)
    if (ownerId !== String(user.memberId)) {
      router.replace(ROUTES.HOME.path);
      return;
    }
  }, [isLoading, user, ownerId, router]);

  // 判定完了かつ自分の owner ページのときだけ描画
  if (
    isLoading ||
    !user ||
    !user.memberId ||
    !user.roleType ||
    ownerId !== String(user.memberId)
  ) {
    return (
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">お待ちください</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">オーナートップ：{user.userName}</h1>
      <SignoutButton />
    </main>
  );
}
