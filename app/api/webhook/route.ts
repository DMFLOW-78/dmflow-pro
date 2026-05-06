export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("🔥 WEBHOOK RECEBIDO");
  console.log(JSON.stringify(body, null, 2));

  if (body.object === "instagram") {
    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {

        console.log("📦 CHANGE COMPLETO:");
        console.log(JSON.stringify(change, null, 2));

        const value = change.value;

        // Tenta capturar qualquer tipo de mensagem possível
        if (value?.messages) {
          for (const msg of value.messages) {
            console.log("📩 NOVA MENSAGEM:");
            console.log("De:", msg.from);
            console.log("Texto:", msg.text?.body);
          }
        }

        if (value?.text) {
          console.log("📩 TEXTO DIRETO:");
          console.log(value.text);
        }

        if (change.field) {
          console.log("📌 Tipo de evento:", change.field);
        }
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}