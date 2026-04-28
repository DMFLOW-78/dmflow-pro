export async function sendInstagramTextMessage(recipientId: string, text: string) {
  const token = process.env.META_PAGE_ACCESS_TOKEN;

  if (!token) {
    throw new Error("META_PAGE_ACCESS_TOKEN não configurado");
  }

  const response = await fetch(
    `https://graph.facebook.com/v25.0/me/messages?access_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Erro ao enviar mensagem:", data);
    throw new Error(data?.error?.message || "Erro ao enviar mensagem");
  }

  return data;
}