"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    // Hono サーバーから挨拶を取得(Next.js が /api/hello を Hono にプロキシ)
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage(`error: ${err}`));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Next.js + Hono with dream2nix</h1>
      <p className="text-xl text-gray-600">From Hono: {message}</p>
    </main>
  );
}
