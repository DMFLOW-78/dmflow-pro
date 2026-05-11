import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN!;

async function sendCommentReply(commentId: string, message: string) {
  const token = process.env.PAGE_ACCESS_TOKEN?.trim();

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

  console.log("💬 RESPOSTA COMENTÁRIO:");
  console.log(JSON.stringify(data, null, 2));

  return data;
}

async function sendPrivateReply(commentId: string, message: string) {
  const token = process.env.PAGE_ACCESS_TOKEN?.trim();

  const response = await fetch(
    `https://graph.facebook.com/v21.0/me/messages?access_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: {
          comment_id: commentId,
        },
        message: {
          text: message,
        },
      }),
    }
  );

  const data = await response.json();

  console.log("📩 PRIVATE REPLY:");
  console.log(JSON.stringify(data, null, 2));

  return data;
}

async function sendInstagramDM(instagramUserId: string, message: string) {
  const token = process.env.DM_ACCESS_TOKEN?.trim();

  const response = await fetch(
    `https://graph.facebook.com/v21.0/me/messages?access_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: {
          id: instagramUserId,
        },
        message: {
          text: message,
        },
      }),
    }
  );

  const data = await response.json();

  console.log("📨 DM INSTAGRAM:");
  console.log(JSON.stringify(data, null, 2));

  return data;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Erro de verificação", { status: 403 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔥 WEBHOOK RECEBIDO");
    console.log(JSON.stringify(body, null, 2));

    if (body.object !== "instagram") {
      return NextResponse.json({ ok: true });
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== "comments") continue;

        const commentText =
          change.value?.text?.toLowerCase()?.trim() || "";

        const commentId = change.value?.id;
        const instagramUserId = change.value?.from?.id;
        const username = change.value?.from?.username;

        console.log("💬 COMENTÁRIO RECEBIDO:", commentText);
        console.log("🆔 COMMENT ID:", commentId);
        console.log("👤 AUTOR:", username);
        console.log("🏢 ACCOUNT:", entry.id);

        const { data: rules, error } = await supabase
  .from("automation_rules")
  .select("*")
  .eq("active", true);

        if (error) {
          console.log("❌ ERRO SUPABASE:", error);
          continue;
        }

        console.log("📦 REGRAS ENCONTRADAS:", rules?.length || 0);

        for (const rule of rules || []) {
          const keywords = (rule.keyword || "")
            .split(",")
            .map((k: string) => k.trim().toLowerCase());

          console.log("🔎 TESTANDO REGRA:", keywords);

          const matchedKeyword = keywords.find((keyword: string) =>
            commentText.includes(keyword)
          );

          if (!matchedKeyword) continue;

          console.log("⚡ MATCH ENCONTRADO:", matchedKeyword);

          if (rule.reply_comment) {
            await sendCommentReply(
              commentId,
              rule.reply_comment
            );
          }

          if (rule.reply_dm) {
            await sendPrivateReply(
              commentId,
              rule.reply_dm
            );
          }

          break;
        }
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