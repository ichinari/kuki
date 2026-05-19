import { APIClient } from "@/api";

export type SignUpArgs = {
  email: string;
  password: string;
  emailRedirectTo: string;
  roleType?: boolean;
};

export class AuthClient extends APIClient {
  constructor() {
    super("/auth/v1");
  }

  async signIn(email: string, password: string) {
    const supabase = await this.getSupabase();
    return supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(args: SignUpArgs) {
    const supabase = await this.getSupabase();
    return supabase.auth.signUp({
      email: args.email,
      password: args.password,
      options: {
        // メール確認リンクから戻る先（confirm route がOTP検証して next に遷移）
        emailRedirectTo: args.emailRedirectTo,
        // user_metadata には DB列に揃えて role_type (snake_case) で格納する
        data:
          typeof args.roleType === "boolean"
            ? { role_type: args.roleType }
            : undefined,
      },
    });
  }

  async signOut() {
    const supabase = await this.getSupabase();
    return supabase.auth.signOut();
  }
}
