import { NextRequest } from "next/server"
import { supabase } from "@/lib/supabase/server"

const VERIFY_TOKEN = "dmflow_token"
const SITE_LINK = "https://dmflow-pro.vercel.app"

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim()
}

async function getTokens(accountId: string) {
  const { data, error } = await supabase
    .from("instagram_accounts")
    .select("page_access_token, dm_access_token")
    .or(`page_id.eq.${accountId},instagram_id.eq.${accountId}`)
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error("❌ ERRO AO BUSCAR TOKENS:", error)
    return null
  }

  return data
}

// =========================
// DM NORMAL
// =========================
async function sendInstagramDM(
  accountId: string,
  recipientId: string,
  text: string
) {
  const tokens = await getTokens(accountId)

  // 🔥 DM normal usa dm_access_token
  const token = tokens?.dm_access_token

  if (!token) {
    console.error("❌ DM TOKEN NÃO ENCONTRADO:", accountId)
    return
  }

  const res = await fetch(
    "https://graph.instagram.com/v25.0/me/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text },
      }),
    }
  )

  const data = await res.json()

  console.log("📤 RESPOSTA DM:")
  console.log(JSON.stringify(data, null, 2))
}

// =========================
// PRIVATE REPLY
// =========================
async function sendPrivateReply(
  accountId: string,
  commentId: string,
  text: string
) {
  const tokens = await getTokens(accountId)

  // 🔥 PRIVATE REPLY usa PAGE TOKEN
  const token = tokens?.page_access_token

  if (!token) {
    console.error(
      "❌ PAGE TOKEN NÃO ENCONTRADO PARA PRIVATE REPLY:",
      accountId
    )

    return
  }

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${accountId}/messages`,
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
          text,
        },
        access_token: token,
      }),
    }
  )

  const data = await res.json()

  console.log("📩 PRIVATE REPLY:")
  console.log(JSON.stringify(data, null, 2))
}

// =========================
// RESPOSTA PÚBLICA
// =========================
async function replyToInstagramComment(
  accountId: string,
  commentId: string,
  text: string
) {
  const tokens = await getTokens(accountId)

  const token = tokens?.page_access_token

  if (!token) {
    console.error(
      "❌ PAGE TOKEN NÃO ENCONTRADO PARA COMENTÁRIO:",
      accountId
    )

    return
  }

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${commentId}/replies`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
        access_token: token,
      }),
    }
  )

  const data = await res.json()

  console.log("💬 RESPOSTA COMENTÁRIO:")
  console.log(JSON.stringify(data, null, 2))
}

async function findMatchingRule(accountId: string, text: string) {
  const normalizedMessage = normalizeText(text)

  const { data: rules, error } = await supabase
    .from("automation_rules")
    .select("*")
    .eq("channel", "instagram")
    .eq("account_id", accountId)
    .eq("active", true)

  if (error) {
    console.error("❌ ERRO AO BUSCAR REGRAS:", error)
    return null
  }

  console.log("📦 REGRAS ENCONTRADAS:", rules?.length ?? 0)

  for (const rule of rules ?? []) {
    const response = String(rule.response_text ?? "").trim()
    const rawTrigger = String(rule.trigger_text ?? "")

    if (!rawTrigger || !response) continue

    const triggers = rawTrigger
      .split(",")
      .map((item) => normalizeText(item))
      .filter(Boolean)

    console.log("🔎 TESTANDO REGRA:", triggers)

    for (const trigger of triggers) {
      if (normalizedMessage.includes(trigger)) {
        console.log("⚡ MATCH ENCONTRADO:", trigger)
        return rule
      }
    }
  }

  console.log("⚠️ NENHUM MATCH ENCONTRADO PARA:", normalizedMessage)

  return null
}

// =========================
// VERIFY WEBHOOK
// =========================
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 })
  }

  return new Response("Erro de verificação", { status: 403 })
}

// =========================
// WEBHOOK
// =========================
export async function POST(req: NextRequest) {
  const body = await req.json()

  console.log("🔥 WEBHOOK RECEBIDO")
  console.log(JSON.stringify(body, null, 2))

  if (body.object !== "instagram") {
    return new Response("EVENT_RECEIVED", { status: 200 })
  }

  for (const entry of body.entry ?? []) {
    const accountId = String(entry.id ?? "")

    // =========================
    // DMs NORMAIS
    // =========================
    for (const event of entry.messaging ?? []) {
      const senderId = event.sender?.id
      const recipientId = event.recipient?.id
      const messageText = event.message?.text

      if (!senderId || !recipientId || !messageText) {
        continue
      }

      console.log("📩 DM RECEBIDA:", normalizeText(messageText))

      const rule = await findMatchingRule(
        recipientId,
        messageText
      )

      if (rule) {
        await sendInstagramDM(
          recipientId,
          senderId,
          String(rule.response_text)
        )

        return new Response("EVENT_RECEIVED", {
          status: 200,
        })
      }
    }

    // =========================
    // COMENTÁRIOS
    // =========================
    for (const change of entry.changes ?? []) {
      if (change.field !== "comments") {
        continue
      }

      const value = change.value ?? {}

      const commentId = value.id
      const commentText = value.text
      const username = value.from?.username

      if (!commentId || !commentText) {
        continue
      }

      console.log(
        "💬 COMENTÁRIO RECEBIDO:",
        normalizeText(commentText)
      )

      console.log("🆔 COMMENT ID:", commentId)
      console.log(
        "👤 AUTOR:",
        username ?? "sem username"
      )

      console.log("🏢 ACCOUNT:", accountId)

      const rule = await findMatchingRule(
        accountId,
        commentText
      )

      if (rule) {
        // resposta pública
        await replyToInstagramComment(
          accountId,
          commentId,
          String(rule.response_text)
        )

        // 🔥 PRIVATE REPLY
        await sendPrivateReply(
          accountId,
          commentId,
          `Oi 👋

Vi seu comentário no post 😊

Aqui está o link:
${SITE_LINK}`
        )

        return new Response("EVENT_RECEIVED", {
          status: 200,
        })
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 })
}