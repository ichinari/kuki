"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

/**
 * このアプリ内で扱うユーザー情報.
 * Supabase の User 全体ではなく必要なフィールドだけに絞る.
 */
export type HooksUser = {
  id: string;
  roleType: boolean;
};

const toHooksUser = (user: User | null): HooksUser | null => {
  if (!user) return null;
  return {
    id: user.id,
    // user_metadata は { [k: string]: any } なので boolean に寄せる
    roleType: Boolean(user.user_metadata?.role_type),
  };
};

/**
 * 現在ログイン中のユーザー (id, roleType) を取得する React Hook.
 *
 * - 初回マウント時に `supabase.auth.getUser()` で取得
 * - `onAuthStateChange` で signin / signout / token refresh に追従
 */
export function useUser() {
  const [user, setUser] = useState<HooksUser | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(toHooksUser(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toHooksUser(session?.user ?? null));
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
