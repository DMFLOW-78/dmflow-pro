export async function sendInstagramTextMessage(
  accessToken: string,
  recipientId: string,
  text: string
) {
  const response = await fetch(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${accessToken}`,
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
    console.error("Erro ao enviar mensagem Instagram:", data);
    throw new Error(data?.error?.message || "Erro ao enviar mensagem");
  }

  return data;
}