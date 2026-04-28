import { sendInstagramTextMessage } from "./instagram";

export async function processInstagramWebhook(body: any) {
  const entries = body?.entry ?? [];

  for (const entry of entries) {
    const messaging = entry?.messaging ?? [];

    for (const event of messaging) {
      const senderId = event?.sender?.id;
      const text = event?.message?.text?.trim();

      if (!senderId || !text) continue;

      const lower = text.toLowerCase();

      let reply = "";

      if (lower.includes("oi") || lower.includes("olá") || lower.includes("ola")) {
        reply =
          "Olá! 👋\n\nSeja bem-vindo ao nosso atendimento.\n\nDigite uma opção:\n1 - Preço\n2 - Horário\n3 - Endereço\n4 - Falar com atendente";
      } else if (lower.includes("1") || lower.includes("preço") || lower.includes("preco")) {
        reply =
          "Perfeito! Me diga qual produto ou serviço você quer consultar que eu te respondo.";
      } else if (lower.includes("2") || lower.includes("horário") || lower.includes("horario")) {
        reply =
          "Nosso horário de atendimento é de segunda a sexta das 9h às 18h.";
      } else if (lower.includes("3") || lower.includes("endereço") || lower.includes("endereco")) {
        reply =
          "Nosso endereço é: https://dmflow-qk9m1j2wt-dmflow-78s-projects.vercel.app/";
      } else if (
        lower.includes("4") ||
        lower.includes("atendente") ||
        lower.includes("humano")
      ) {
        reply =
          "Certo! Seu atendimento será encaminhado para um atendente humano.";
      } else {
        reply =
          "Não entendi sua mensagem ainda 😊\n\nDigite:\n1 - Preço\n2 - Horário\n3 - Endereço\n4 - Atendente";
      }

      await sendInstagramTextMessage(senderId, reply);
    }
  }
}