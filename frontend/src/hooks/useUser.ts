"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

/**
 * 現在ログイン中のユーザーを取得する React Hook.
 *
 * - 初回マウント時に `supabase.auth.getUser()` で取得
 * - `onAuthStateChange` で signin / signout / token refresh に追従
 * - 取得完了までは `loading: true`
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const resetUser = () => {
    setUser(null);
  };

  return { user, resetUser };
}
