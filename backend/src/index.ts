import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());
app.use(
  "/api/*",
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3000"],
  }),
);

const routes = app
  .get("/", (c) => c.text("Hono is running 🔥"))
  .get("/api/hello", (c) =>
    c.json({
      message: "Hello from Hono!",
      timestamp: new Date().toISOString(),
    }),
  );

app.notFound((c) => c.json({ error: "Not Found" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

export type AppType = typeof routes;

const port = process.env.PORT ? Number(process.env.PORT) : 8787;
console.log(`🔥 Hono server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
