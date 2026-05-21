"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

/**
 * このアプリ内で扱うユーザー情報.
 */
export type HooksUser = {
  id: string;
  memberId?: string;
  roleType: boolean;
  userName?: string;
};

/**
 * profiles テーブルから取得するカラム.
 * 取得カラムを増やす場合は select(...) と本型を同時に更新する.
 */
type Profile = {
  member_id: string;
  user_name: string;
  role_type: boolean;
};

const toHooksUser = (
  user: User | null,
  profile: Profile | null,
): HooksUser | null => {
  if (!user) return null;
  return {
    id: user.id,
    roleType: Boolean(profile?.role_type),
    memberId: profile?.member_id,
    userName: profile?.user_name,
  };
};

type UserContextValue = {
  user: HooksUser | null;
  isLoading: boolean;
  resetUser: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

/**
 * アプリ全体で1度だけ supabase セッション取得 + profiles fetch を実行し、
 * 結果を Context 経由で配信する.
 *
 * これにより `useUserContext` がページ/コンポーネントから複数回呼ばれても、
 * 内部の supabase 呼び出しは1セットに集約される.
 */
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<HooksUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    // auth.id をキーに profiles 行を引く
    const fetchProfile = async (
      authUserId: string,
    ): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("member_id, user_name, role_type")
        .eq("id", authUserId)
        .maybeSingle();
      if (error) return null;
      return data as Profile | null;
    };

    // 認証ユーザー(または未ログインなら null) を受け取り、profile を取得して state に反映する.
    const sync = async (authUser: User | null) => {
      const profile = authUser ? await fetchProfile(authUser.id) : null;
      if (!mounted) return;
      setUser(toHooksUser(authUser, profile));
      setIsLoading(false);
    };

    // 初回ロード: middleware が getUser() で検証/更新した cookie からセッションを取り出す.
    //   getUser() を browser でも呼ぶと auth server へのネットワーク呼び出しが発生し、
    //   onAuthStateChange と同時実行されると稀に解決しないことがあるため getSession() を使う.
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (mounted) void sync(session?.user ?? null);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
        setIsLoading(false);
      });

    // ログイン/ログアウト/トークン更新の変化を反映.
    // コールバック内で await すると Supabase が後続イベントを処理できなくなるため、
    // コールバックは同期にして async 処理は void で外に追い出す.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      void sync(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const resetUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Context から user / isLoading / resetUser を取り出す.
 * `<UserProvider>` の外で呼ばれた場合は例外を投げる.
 */
export function useUserContext(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within <UserProvider>");
  }
  return ctx;
}
