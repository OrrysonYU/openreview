import { after, NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { bot } from "@/lib/chat";

export const POST = (request: NextRequest): Promise<NextResponse> => {
  const handler = bot.webhooks.github;

  if (!handler) {
    return Promise.resolve(
      NextResponse.json(
        { error: "GitHub adapter not configured" },
        { status: 404 }
      )
    );
  }

  return handler(request, {
    waitUntil: (task) => after(() => task),
  }) as Promise<NextResponse>;
};
