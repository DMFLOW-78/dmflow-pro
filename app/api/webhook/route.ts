import { NextRequest } from "next/server";

const VERIFY_TOKEN = "dmflow_token";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ WEBHOOK VERIFICADO");
    return new Response(challenge ?? "", { status: 200 });
  }

  return new Response("Erro de verificação", { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("🔥 WEBHOOK RECEBIDO");
  console.log(JSON.stringify(body, null, 2));

  if (body.object === "instagram") {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (messages) {
      for (const msg of messages) {
        console.log("📩 NOVA MENSAGEM:");
        console.log("De:", msg.from);
        console.log("Texto:", msg.text?.body);
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}