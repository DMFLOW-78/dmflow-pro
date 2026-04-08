export async function sendInstagramMessage(recipientId: string, text: string) {
  const token = process.env.META_PAGE_ACCESS_TOKEN;

  const response = await fetch(`https://graph.facebook.com/v22.0/me/messages?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      messaging_type: 'RESPONSE',
      message: { text },
    }),
  });

  return response.json();
}