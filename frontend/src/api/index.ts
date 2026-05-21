import type { SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export type ApiError = {
  message: string;
  status?: number;
};

export type ApiResult<T> = {
  data: T | null;
  error: ApiError | null;
};

export abstract class APIClient {
  protected baseUrl: string;
  private _id: string | number | null = null;

  // 1. super() で path を受け取る
  //    例: "/rest/v1/users", "/rest/v1/users?id=eq.:id", "/auth/v1/user"
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // 2. URL内にid情報が必要な場合の get / set
  public get id(): string | number | null {
    return this._id;
  }

  public set id(value: string | number | null) {
    this._id = value;
  }

  // ID を埋め込み、NEXT_PUBLIC_SUPABASE_URL を基底にして絶対 URL を生成
  protected getResolvedUrl(): string {
    const path =
      this._id !== null && this.baseUrl.includes(":id")
        ? this.baseUrl.replace(":id", String(this._id))
        : this.baseUrl;
    return new URL(path, SUPABASE_URL).toString();
  }

  // 3. supabase-js SDK を直接使いたい場合のヘルパー
  //    auth.signInWithPassword / signUp / signOut / getUser などに使用
  //    サブクラスで server / browser いずれかの supabase クライアントを返す
  protected abstract getSupabase(): Promise<SupabaseClient> | SupabaseClient;

  // 4. REST API 呼び出し時の認証ヘッダ
  //    apikey + 現在セッションの Bearer トークン (未ログイン時は anon key)
  protected async getAuthHeaders(): Promise<Record<string, string>> {
    const supabase = await this.getSupabase();
    const { data } = await supabase.auth.getSession();
    return {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${data.session?.access_token ?? SUPABASE_KEY}`,
    };
  }

  // 5. 共通リクエスト処理
  protected async request<T>(
    method: string,
    body?: unknown,
    params?: Record<string, string | number | boolean>,
  ): Promise<ApiResult<T>> {
    const url = new URL(this.getResolvedUrl());
    if (params) {
      Object.entries(params).forEach(([k, v]) =>
        url.searchParams.set(k, String(v)),
      );
    }
    const headers = await this.getAuthHeaders();

    try {
      const res = await fetch(url.toString(), {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        const text = await res.text();
        let message = `HTTP ${res.status}`;
        try {
          const j: unknown = JSON.parse(text);
          if (j !== null && typeof j === "object") {
            const obj = j as Record<string, unknown>;
            if (typeof obj.message === "string") message = obj.message;
            else if (typeof obj.error === "string") message = obj.error;
          }
        } catch {
          if (text) message = text;
        }
        return { data: null, error: { message, status: res.status } };
      }

      if (res.status === 204) return { data: null, error: null };
      const data = (await res.json()) as T;
      return { data, error: null };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return { data: null, error: { message } };
    }
  }

  // GET: データの取得
  public show<T>(params?: Record<string, string | number | boolean>) {
    return this.request<T>("GET", undefined, params);
  }

  // POST: 新規作成
  public post<T>(body: unknown) {
    return this.request<T>("POST", body);
  }

  // PUT: 更新
  public put<T>(body: unknown) {
    return this.request<T>("PUT", body);
  }

  // DELETE: 削除
  public delete<T>() {
    return this.request<T>("DELETE");
  }
}
