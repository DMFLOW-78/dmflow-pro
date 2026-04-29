export async function processInstagramWebhook(body: any) {
  console.log("Webhook recebido na automação:", JSON.stringify(body, null, 2));

  const entries = body?.entry ?? [];

  for (const entry of entries) {
    const messaging = entry?.messaging ?? [];

    for (const event of messaging) {
      const senderId = event?.sender?.id;
      const text = event?.message?.text?.trim();

      if (!senderId || !text) continue;

      console.log("Mensagem recebida:", {
        senderId,
        text,
      });
    }
  }
}