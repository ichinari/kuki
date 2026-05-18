import { NextResponse, type NextRequest } from "next/server";
import { AuthClient } from "@/api/auth";

class SignoutRoute extends AuthClient {
  async handle(_request: NextRequest) {
    const { error } = await this.signOut();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  }
}

export async function POST(request: NextRequest) {
  return new SignoutRoute().handle(request);
}
