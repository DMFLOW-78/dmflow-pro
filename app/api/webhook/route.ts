import { supabase } from "@/lib/supabase/server"

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
      recipient: { id: recipientId },
      message: { text },
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
        const recipientId = event.recipient?.id;
        const text = event.message?.text;

        if (!senderId || !recipientId || !text) continue;

        const normalized = text.toLowerCase().trim();

        console.log("📩 MSG:", normalized);

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
          console.error("Supabase não configurado");
          continue;
        }

        const rulesRes = await fetch(
          `${supabaseUrl}/rest/v1/automation_rules?channel=eq.instagram&account_id=eq.${recipientId}&active=eq.true`,
          {
            headers: {
              apikey: supabaseAnonKey,
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
          }
        );

        const rules = await rulesRes.json();

        console.log("📦 REGRAS:", rules);

        for (const rule of rules ?? []) {
          const trigger = String(rule.trigger_text ?? "").toLowerCase().trim();

          if (trigger && normalized.includes(trigger)) {
            console.log("⚡ MATCH:", trigger);

            await sendInstagramMessage(senderId, rule.response_text);

            return new Response("EVENT_RECEIVED", { status: 200 });
          }
        }
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}