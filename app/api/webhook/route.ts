import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const VERIFY_TOKEN = "dmflow_token";

  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Erro de verificação", { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Webhook recebido:", body);

  return NextResponse.json({ ok: true });
}