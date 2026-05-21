import { APIClient } from "@/api";
import { createClient } from "@/utils/supabase/client";

/**
 * ブラウザ (Client Component) から使う認証クライアント。
 * server 版 `AuthClient` と対になるもので、`getSupabase()` のみが異なる。
 */
export class ClientAuthClient extends APIClient {
  constructor() {
    super("/auth/v1");
  }

  protected getSupabase() {
    return createClient();
  }

  async signIn(email: string, password: string) {
    const supabase = this.getSupabase();
    return supabase.auth.signInWithPassword({ email, password });
  }

  /**
   * 新規登録. user_metadata.role_type に DB列に合わせて snake_case で格納する.
   * メール確認が必要な設定の場合、session は返らず data.session が null になる.
   */
  async signUp(args: {
    email: string;
    password: string;
    roleType: boolean;
    emailRedirectTo?: string;
  }) {
    const supabase = this.getSupabase();
    return supabase.auth.signUp({
      email: args.email,
      password: args.password,
      options: {
        emailRedirectTo: args.emailRedirectTo,
        data: { role_type: args.roleType },
      },
    });
  }

  async signOut() {
    const supabase = this.getSupabase();
    return supabase.auth.signOut();
  }

  /**
   * ログイン直後など、`useUser` の更新を待たずに member_id が欲しい場合に使う.
   * 該当 profile が無い / 取得失敗のときは null を返す.
   */
  async fetch(
    userId: string,
  ): Promise<{ memberId: string; roleType: boolean } | null> {
    const supabase = this.getSupabase();
    const { data, error } = await supabase
      .from("profiles")
      .select("member_id, role_type")
      .eq("id", userId)
      .maybeSingle();
    if (error || !data) return null;
    return {
      memberId: data.member_id,
      roleType: data.role_type,
    };
  }
}
