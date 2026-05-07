import { NextRequest } from "next/server"
import { supabase } from "@/lib/supabase/server"

const VERIFY_TOKEN = "dmflow_token"

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

async function sendInstagramMessage(recipientId: string, text: string) {
  const token = process.env.IG_ACCESS_TOKEN

  if (!token) {
    console.error("IG_ACCESS_TOKEN não configurado")
    return
  }

  const res = await fetch("https://graph.instagram.com/v25.0/me/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
    }),
  })

  const data = await res.json()
  console.log("📤 RESPOSTA DM:", JSON.stringify(data, null, 2))
}

async function replyToInstagramComment(commentId: string, text: string) {
  const token = process.env.IG_ACCESS_TOKEN

  if (!token) {
    console.error("IG_ACCESS_TOKEN não configurado")
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
  console.log("💬 RESPOSTA COMENTÁRIO:", JSON.stringify(data, null, 2))
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
    const rawTrigger = String(rule.trigger_text ?? "")
    const response = String(rule.response_text ?? "").trim()

    if (!rawTrigger || !response) continue

    const triggers = rawTrigger
      .split(",")
      .map((item) => normalizeText(item))
      .filter(Boolean)

    for (const trigger of triggers) {
      if (normalizedMessage.includes(trigger)) {
        console.log("⚡ MATCH ENCONTRADO:", trigger)
        return rule
      }
    }
  }

  return null
}

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

export async function POST(req: NextRequest) {
  const body = await req.json()

  console.log("🔥 WEBHOOK RECEBIDO")
  console.log(JSON.stringify(body, null, 2))

  if (body.object !== "instagram") {
    return new Response("EVENT_RECEIVED", { status: 200 })
  }

  for (const entry of body.entry ?? []) {
    const accountId = String(entry.id ?? "")

    for (const event of entry.messaging ?? []) {
      const senderId = event.sender?.id
      const recipientId = event.recipient?.id
      const messageText = event.message?.text

      if (!senderId || !recipientId || !messageText) continue

      console.log("📩 DM RECEBIDA:", normalizeText(messageText))
      console.log("👤 SENDER:", senderId)
      console.log("🏢 RECIPIENT:", recipientId)

      const rule = await findMatchingRule(recipientId, messageText)

      if (rule) {
        await sendInstagramMessage(senderId, String(rule.response_text))
        return new Response("EVENT_RECEIVED", { status: 200 })
      }
    }

    for (const change of entry.changes ?? []) {
      const value = change.value ?? {}

      const commentId = value.id
      const commentText = value.text
      const fromId = value.from?.id

      if (!commentId || !commentText) continue

      console.log("💬 COMENTÁRIO RECEBIDO:", normalizeText(commentText))
      console.log("👤 AUTOR COMENTÁRIO:", fromId ?? "desconhecido")
      console.log("🏢 ACCOUNT:", accountId)

      const rule = await findMatchingRule(accountId, commentText)

      if (rule) {
        await replyToInstagramComment(commentId, String(rule.response_text))
        return new Response("EVENT_RECEIVED", { status: 200 })
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 })
}