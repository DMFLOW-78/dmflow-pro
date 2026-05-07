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

        const normalized = text.toLowerCase().trim();

        console.log("📩 MSG:", normalized);

        // 🔥 BUSCAR REGRAS NO SUPABASE
        const res = await fetch(
          `${process.env.SUPABASE_URL}/rest/v1/automation_rules?channel=eq.instagram&account_id=eq.${event.recipient.id}&active=eq.true`,
          {
            headers: {
              apikey: process.env.SUPABASE_ANON_KEY!,
              Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
            },
          }
        );

        const rules = await res.json();

        console.log("📦 REGRAS:", rules.length);

        for (const rule of rules) {
          if (normalized.includes(rule.trigger_text.toLowerCase())) {
            console.log("⚡ MATCH:", rule.trigger_text);

            await sendInstagramMessage(
              senderId,
              rule.response_text
            );

            return new Response("EVENT_RECEIVED", { status: 200 });
          }
        }
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}