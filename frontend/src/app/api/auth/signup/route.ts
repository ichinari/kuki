import { NextResponse, type NextRequest } from "next/server";
import { AuthClient } from "@/api/auth";

class SignupRoute extends AuthClient {
  async handle(request: NextRequest) {
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

    const { data, error } = await this.signUp({
      email,
      password,
      emailRedirectTo: `${request.nextUrl.origin}/api/auth/confirm`,
      roleType,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      user: data.user,
      needsEmailConfirmation: !data.session,
    });
  }
}

export async function POST(request: NextRequest) {
  return new SignupRoute().handle(request);
}
