import { NextResponse, type NextRequest } from "next/server";
import { AuthClient } from "@/api/auth";

class LoginRoute extends AuthClient {
  async handle(request: NextRequest) {
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "email と password は必須です" },
        { status: 400 },
      );
    }

    const { data, error } = await this.signIn(email, password);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ user: data.user });
  }
}

export async function POST(request: NextRequest) {
  return new LoginRoute().handle(request);
}
