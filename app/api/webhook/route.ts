import { NextRequest } from "next/server"
import { supabase } from "@/lib/supabase/server"

const VERIFY_TOKEN = "dmflow_token"

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
  console.log("📤 RESPOSTA INSTAGRAM:", JSON.stringify(data, null, 2))
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
    for (const event of entry.messaging ?? []) {
      const senderId = event.sender?.id
      const recipientId = event.recipient?.id
      const text = event.message?.text

      if (!senderId || !recipientId || !text) {
        continue
      }

      const normalizedText = text.toLowerCase().trim()

      console.log("📩 MENSAGEM RECEBIDA:", normalizedText)
      console.log("👤 SENDER:", senderId)
      console.log("🏢 RECIPIENT:", recipientId)

      const { data: rules, error } = await supabase
        .from("automation_rules")
        .select("*")
        .eq("channel", "instagram")
        .eq("account_id", recipientId)
        .eq("active", true)

      if (error) {
        console.error("❌ ERRO AO BUSCAR REGRAS:", error)
        continue
      }

      console.log("📦 REGRAS ENCONTRADAS:", rules?.length ?? 0)
      console.log(JSON.stringify(rules, null, 2))

      for (const rule of rules ?? []) {
        const trigger = String(rule.trigger_text ?? "").toLowerCase().trim()
        const response = String(rule.response_text ?? "").trim()

        if (!trigger || !response) {
          continue
        }

        if (normalizedText.includes(trigger)) {
          console.log("⚡ MATCH ENCONTRADO:", trigger)

          await sendInstagramMessage(senderId, response)

          return new Response("EVENT_RECEIVED", { status: 200 })
        }
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 })
}