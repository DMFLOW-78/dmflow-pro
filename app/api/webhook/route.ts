import { NextRequest } from "next/server";

const VERIFY_TOKEN = "dmflow_token";

async function sendInstagramMessage(recipientId: string, text: string) {
  const token = process.env.IG_ACCESS_TOKEN;

  if (!token) {
    console.error("IG_ACCESS_TOKEN não configurado");
    return;
  }

  const res = await fetch("https://graph.instagram.com/v25.0/me/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      recipient: {
        id: recipientId,
      },
      message: {
        text,
      },
    }),
  });

  const data = await res.json();

  console.log("📤 RESPOSTA ENVIADA:");
  console.log(JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
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
      for (const event of entry.messaging ?? []) {
        const senderId = event.sender?.id;
        const text = event.message?.text;

        if (!senderId || !text) continue;

        console.log("📩 NOVA DM:");
        console.log("De:", senderId);
        console.log("Texto:", text);

        const normalized = text.toLowerCase().trim();

        if (
          normalized === "oi" ||
          normalized === "olá" ||
          normalized === "ola" ||
          normalized === "teste"
        ) {
          await sendInstagramMessage(
            senderId,
            "Olá! 👋 Recebi sua mensagem pelo 67Flow. Em breve vou te responder melhor por aqui."
          );
        }
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}