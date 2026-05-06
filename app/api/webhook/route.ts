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
    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value;

        if (change.field === "messages") {
          console.log("📩 NOVA MENSAGEM:");
          console.log("De:", value?.from);
          console.log("Texto:", value?.text);
          console.log("Mensagem completa:", JSON.stringify(value, null, 2));
        }
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}