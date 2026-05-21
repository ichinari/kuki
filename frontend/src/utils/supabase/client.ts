import { createBrowserClient } from "@supabase/ssr";

const buildClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase環境変数が設定されていません");
  }

  return createBrowserClient(url, key, {
    auth: {
      // デフォルトの navigator.locks ベース実装はマルチタブ同期のためのものだが、
      // 環境によってロックが解放されずデッドロックする事例がある.
      // 単一タブ運用ならロックは不要 → fn() を即時実行する no-op に上書きする.
      lock: async (name, _acquireTimeout, fn) => {
        console.log("[supabase-lock] noop entered:", name);
        const r = await fn();
        console.log("[supabase-lock] noop exited:", name);
        return r;
      },
    },
  });
};

// ブラウザではシングルセッションなのでモジュールスコープでシングルトン化
let cachedClient: ReturnType<typeof buildClient> | null = null;

export function createClient() {
  if (!cachedClient) cachedClient = buildClient();
  return cachedClient;
}
