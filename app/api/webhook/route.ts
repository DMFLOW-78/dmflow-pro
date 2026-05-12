import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.URL_SUPABASE;

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN!;

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        access_token: token,
      }),
    }
  );

  const data = await response.json();

  console.log("💬 RESPOSTA COMENTÁRIO:");
  console.log(JSON.stringify(data, null, 2));

  return data;
}

async function sendInstagramDM(
  instagramAccountId: string,
  recipientId: string,
  message: string
) {
  const token = process.env.PAGE_ACCESS_TOKEN?.trim();

  if (!token) {
    console.error("❌ PAGE_ACCESS_TOKEN ausente");
    return;
  }

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${instagramAccountId}/messages?access_token=${encodeURIComponent(
      token
    )}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: {
          id: recipientId,
        },
        message: {
          text: message,
        },
      }),
    }
  );

  const data = await response.json();

  console.log("📨 RESPOSTA DM:");
  console.log(JSON.stringify(data, null, 2));

  return data;
}

function getKeywords(rule: any): string[] {
  return String(rule.trigger_text || "")
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);
}

function getResponseText(rule: any): string {
  return String(rule.response_text || "").trim();
}

async function findMatchingRule(accountId: string, text: string) {
  const { data: rules, error } = await supabase
    .from("automation_rules")
    .select("*")
    .eq("active", true)
    .eq("account_id", accountId);

  if (error) {
    console.log("❌ ERRO SUPABASE:", error);
    return null;
  }

  console.log("📦 REGRAS ENCONTRADAS:", rules?.length || 0);

  for (const rule of rules || []) {
    const keywords = getKeywords(rule);

    console.log("🔎 TESTANDO REGRA:", keywords);

    if (keywords.length === 0) continue;

    const matchedKeyword = keywords.find((keyword) =>
      text.includes(keyword)
    );

    if (!matchedKeyword) continue;

    console.log("⚡ MATCH ENCONTRADO:", matchedKeyword);

    const responseText = getResponseText(rule);

    if (!responseText) {
      console.log("⚠️ Regra sem resposta.");
      return null;
    }

    return responseText;
  }

  return null;
}

async function handleComment(entry: any, change: any) {
  const instagramAccountId = entry.id;

  const commentText = String(change.value?.text || "")
    .toLowerCase()
    .trim();

  const commentId = change.value?.id;
  const username = change.value?.from?.username;

  console.log("💬 COMENTÁRIO RECEBIDO:", commentText);
  console.log("🆔 COMMENT ID:", commentId);
  console.log("👤 AUTOR:", username);
  console.log("🏢 ACCOUNT:", instagramAccountId);

  if (!instagramAccountId || !commentId || !commentText) {
    console.log("⚠️ Comentário inválido. Ignorando.");
    return;
  }

  const responseText = await findMatchingRule(
    instagramAccountId,
    commentText
  );

  if (!responseText) return;

  await sendCommentReply(commentId, responseText);

  console.log("📩 Private Reply desativado temporariamente.");
}

async function handleDM(entry: any, messaging: any) {
  const instagramAccountId = entry.id;

  const senderId = messaging.sender?.id;
  const messageText = String(messaging.message?.text || "")
    .toLowerCase()
    .trim();

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

  const responseText = await findMatchingRule(
    instagramAccountId,
    messageText
  );

  if (!responseText) return;

  await sendInstagramDM(
    instagramAccountId,
    senderId,
    responseText
  );
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

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}