"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserProvider";
import { ROUTES } from "@/routes/route";

interface SignoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function SignoutButton({
  className,
  children = "ログアウト",
}: SignoutButtonProps) {
  const router = useRouter();
  const { resetUser } = useUserContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignout = async () => {
    setIsPending(true);
    setError(null);

    const res = await fetch("/api/auth/signout", { method: "POST" });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setError(body?.error ?? "ログアウトに失敗しました");
      setIsPending(false);
      return;
    }

    setIsPending(false);
    resetUser();
    router.push(ROUTES.LOGIN.path);
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleSignout}
        disabled={isPending}
        className={className}
      >
        {isPending ? "ログアウト中..." : children}
      </button>
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </>
  );
}
