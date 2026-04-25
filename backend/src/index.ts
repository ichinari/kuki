import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

const app = new Hono();

// CORS を許可(開発時の保険)
app.use("/*", cors());

// ルート
app.get("/", (c) => {
  return c.text("Hono is running 🔥");
});

// API エンドポイント(Frontend から呼ばれる)
app.get("/api/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
    timestamp: new Date().toISOString(),
  });
});

// サーバー起動
const port = Number(process.env.PORT) || 8787;
console.log(`🔥 Hono server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
