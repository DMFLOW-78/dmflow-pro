import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === "dmflow_token") {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Erro", { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("🔥 WEBHOOK RECEBIDO:");
  console.log(JSON.stringify(body, null, 2));

  return new Response("EVENT_RECEIVED", { status: 200 });
}