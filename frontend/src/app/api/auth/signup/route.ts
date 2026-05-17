import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const { email, password, roleType } = (await request.json()) as {
    email?: string;
    password?: string;
    roleType?: boolean;
  };

  if (!email || !password) {
    return NextResponse.json(
      { error: "email と password は必須です" },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const origin = request.nextUrl.origin;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // メール確認リンクから戻る先（confirm route がOTP検証して next に遷移）
      emailRedirectTo: `${origin}/api/auth/confirm`,
      // クライアントは roleType (camelCase) で受け取り、user_metadata には
      // DB列に揃えて role_type (snake_case) で格納する
      data: typeof roleType === "boolean" ? { role_type: roleType } : undefined,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    user: data.user,
    needsEmailConfirmation: !data.session,
  });
}
