import { createBrowserClient } from "@supabase/ssr";

const buildClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase環境変数が設定されていません");
  }

  return createBrowserClient(url, key);
};

// ブラウザではシングルセッションなのでモジュールスコープでシングルトン化
let cachedClient: ReturnType<typeof buildClient> | null = null;

export function createClient() {
  if (!cachedClient) cachedClient = buildClient();
  return cachedClient;
}
