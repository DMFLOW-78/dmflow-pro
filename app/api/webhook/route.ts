import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.URL_SUPABASE;

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

const supabase = createClient(supabaseUrl!, supabaseKey!);

function normalizeText(text: string) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function saveLead({
  username,
  userId,
  source,
  message,
  triggerUsed,
}: {
  username?: string;
  userId?: string;
  source: "comment" | "dm";
  message: string;
  triggerUsed?: string;
}) {
  const { error } = await supabase.from("leads").insert({
    username: username || null,
    user_id: userId || null,
    source,
    message,
    trigger_used: triggerUsed || null,
  });

  if (error) {
    console.log("❌ ERRO AO SALVAR LEAD:", error);
    return;
  }

  console.log("✅ LEAD SALVO:", source, userId || username);
}

async function findMatchingRule(accountId: string, text: string) {
  const cleanText = normalizeText(text);

  const { data: rules, error } = await supabase
    .from("automation_rules")
    .select("*")
    .eq("active", true)
    .eq("account_id", accountId);

  if (error) {
    console.log("❌ ERRO AO BUSCAR REGRAS:", error);
    return null;
  }

  console.log("📦 REGRAS ENCONTRADAS:", rules?.length || 0);

  for (const rule of rules || []) {
    const keywords = String(rule.trigger_text || "")
      .split(",")
      .map((keyword) => normalizeText(keyword))
      .filter(Boolean);

    console.log("🔎 TESTANDO PALAVRAS:", keywords);

    const matchedKeyword = keywords.find((keyword) =>
      cleanText.includes(keyword)
    );

    if (!matchedKeyword) continue;

    const responseText = String(rule.response_text || "").trim();

    if (!responseText) {
      console.log("⚠️ REGRA SEM RESPOSTA:", rule.id);
      return null;
    }

    console.log("⚡ AUTOMAÇÃO ENCONTRADA:", matchedKeyword);

    return {
      responseText,
      matchedKeyword,
    };
  }

  console.log("🚫 NENHUMA AUTOMAÇÃO BATEU COM:", cleanText);
  return null;
}

async function sendCommentReply(commentId: string, message: string) {
  const token = process.env.PAGE_ACCESS_TOKEN?.trim();

  if (!token) {
    console.error("❌ PAGE_ACCESS_TOKEN ausente");
    return;
  }

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${commentId}/replies`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        access_token: token,
      }),
    }
  );

  const data = await response.json();

  console.log("💬 RESPOSTA DO COMENTÁRIO:");
  console.log(JSON.stringify(data, null, 2));

  return data;
}

async function sendInstagramDM(recipientId: string, message: string) {
  const token =
    process.env.DM_ACCESS_TOKEN?.trim() ||
    process.env.PAGE_ACCESS_TOKEN?.trim();

  const pageId = process.env.FACEBOOK_PAGE_ID?.trim();

  if (!token) {
    console.error("❌ DM_ACCESS_TOKEN/PAGE_ACCESS_TOKEN ausente");
    return;
  }

  if (!pageId) {
    console.error("❌ FACEBOOK_PAGE_ID ausente");
    return;
  }

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${process.env.INSTAGRAM_ACCOUNT_ID}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: {
          id: recipientId,
        },
        message: {
          text: message,
        },
        access_token: token,
      }),
    }
  );

  const data = await response.json();

  console.log("📨 RESPOSTA DA DM:");
  console.log(JSON.stringify(data, null, 2));

  return data;
}

async function handleComment(entry: any, change: any) {
  const instagramAccountId = entry.id;

  const commentText = String(change.value?.text || "").trim();
  const commentId = change.value?.id;
  const userId = change.value?.from?.id;
  const username = change.value?.from?.username;

  console.log("💬 COMENTÁRIO RECEBIDO:", commentText);
  console.log("🆔 COMMENT ID:", commentId);
  console.log("👤 AUTOR:", username);
  console.log("🏢 ACCOUNT:", instagramAccountId);

  if (!instagramAccountId || !commentId || !commentText) {
    console.log("⚠️ Comentário inválido. Ignorando.");
    return;
  }

  const match = await findMatchingRule(instagramAccountId, commentText);

  await saveLead({
    username,
    userId,
    source: "comment",
    message: commentText,
    triggerUsed: match?.matchedKeyword,
  });

  if (!match) return;

  await sendCommentReply(commentId, match.responseText);
}

async function handleDM(entry: any, messaging: any) {
  const instagramAccountId = entry.id;

  const senderId = messaging.sender?.id;
  const messageText = String(messaging.message?.text || "").trim();

  console.log("📥 DM RECEBIDA:", messageText);
  console.log("👤 SENDER ID:", senderId);
  console.log("🏢 ACCOUNT:", instagramAccountId);

  if (!instagramAccountId || !senderId || !messageText) {
    console.log("⚠️ DM inválida. Ignorando.");
    return;
  }

  if (senderId === instagramAccountId) {
    console.log("⚠️ Mensagem enviada pela própria conta. Ignorando.");
    return;
  }

  const match = await findMatchingRule(instagramAccountId, messageText);

  await saveLead({
    userId: senderId,
    source: "dm",
    message: messageText,
    triggerUsed: match?.matchedKeyword,
  });

  if (!match) return;

  await sendInstagramDM(senderId, match.responseText);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Erro de verificação", { status: 403 });
}

export async function POST(req: Request) {
  try {
    console.log("SUPABASE_URL existe?", Boolean(supabaseUrl));
    console.log("SUPABASE_KEY existe?", Boolean(supabaseKey));

    const body = await req.json();

    console.log("🔥 WEBHOOK RECEBIDO");
    console.log(JSON.stringify(body, null, 2));

    if (body.object !== "instagram") {
      return NextResponse.json({ ok: true });
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === "comments") {
          await handleComment(entry, change);
        }
      }

      for (const messaging of entry.messaging || []) {
        await handleDM(entry, messaging);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ ERRO WEBHOOK:", error);

    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}