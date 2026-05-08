"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { createSupabaseClient } from "@/lib/supabase/client"

type InstagramAccount = {
  page_id: string
  page_name: string
  instagram_id: string
  instagram_username: string | null
  page_access_token: string | null
}

export default function IntegrationsPage() {
  const [account, setAccount] = useState<InstagramAccount | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadIntegration() {
      const supabase = createSupabaseClient()

      const { data, error } = await supabase
        .from("instagram_accounts")
        .select("page_id,page_name,instagram_id,instagram_username,page_access_token")
        .not("page_access_token", "is", null)
        .neq("page_access_token", "COLE_AQUI_O_VALOR_DO_IG_ACCESS_TOKEN")
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error("Erro ao buscar integração:", error)
      }

      setAccount(data)
      setLoading(false)
    }

    loadIntegration()
  }, [])

  const connected = !!account

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Header />

        <div style={gridCards}>
          <IntegrationCard
            icon="📸"
            title="Instagram"
            status={loading ? "Carregando..." : connected ? "Conectado" : "Desconectado"}
            description={
              connected
                ? `Conectado como @${account.instagram_username ?? account.page_name}`
                : "Conecte seu Instagram profissional para ativar DMs e comentários automáticos."
            }
            primaryAction={connected ? "Reconfigurar" : "Conectar Instagram"}
            primaryHref="/api/meta/login"
          />

          <IntegrationCard
            icon="💬"
            title="Comentários"
            status={connected ? "Disponível" : "Bloqueado"}
            description="Responder automaticamente comentários em posts e enviar DM para quem comentou."
            disabled={!connected}
          />
        </div>

        <div style={gridMain}>
          <CommentsPreview connected={connected} />
          <NextSteps connected={connected} />
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div style={headerStyle}>
      <div>
        <p style={titleTop}>INTEGRAÇÕES</p>
        <h1 style={titleMain}>Instagram e Automação</h1>
        <p style={subtitle}>
          Conecte sua conta e ative respostas automáticas em DMs e comentários.
        </p>
      </div>

      <Link href="/dashboard" style={secondaryButton}>
        Voltar
      </Link>
    </div>
  )
}

function IntegrationCard({
  icon,
  title,
  status,
  description,
  primaryAction,
  primaryHref,
  disabled,
}: any) {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={iconBox}>{icon}</div>
        <div>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span style={statusTag}>{status}</span>
        </div>
      </div>

      <p style={desc}>{description}</p>

      {primaryAction && (
        <a
          href={primaryHref}
          style={{
            ...buttonPrimary,
            opacity: disabled ? 0.5 : 1,
            pointerEvents: disabled ? "none" : "auto",
          }}
        >
          {primaryAction}
        </a>
      )}
    </div>
  )
}

function CommentsPreview({ connected }: { connected: boolean }) {
  return (
    <div style={panel}>
      <h2>Comentários automáticos</h2>
      <p style={muted}>
        {connected
          ? "Integração ativa. Agora você pode responder comentários automaticamente."
          : "Conecte o Instagram para liberar respostas automáticas nos comentários."}
      </p>

      <div style={fakeComment}>
        <strong>@cliente123</strong>
        <p>Quanto custa?</p>
      </div>

      <div style={fakeComment}>
        <strong>Resposta automática:</strong>
        <p>Oi! Te mandei uma mensagem no direct 😉</p>
      </div>
    </div>
  )
}

function NextSteps({ connected }: { connected: boolean }) {
  return (
    <div style={panel}>
      <h2>Próximos passos</h2>
      <ul>
        <li>{connected ? "Instagram conectado ✅" : "Conectar Instagram"}</li>
        <li>Ativar respostas automáticas</li>
        <li>Configurar palavras-chave</li>
        <li>Responder comentários automaticamente</li>
      </ul>
    </div>
  )
}

const pageStyle = {
  minHeight: "100vh",
  background: "#070812",
  color: "#fff",
  padding: 32,
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 30,
}

const titleTop = { color: "#ff3ea5", fontWeight: 700 }
const titleMain = { fontSize: 34, margin: "5px 0" }
const subtitle = { color: "#aaa" }

const gridCards = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  marginBottom: 20,
}

const gridMain = {
  display: "grid",
  gridTemplateColumns: "1.3fr 1fr",
  gap: 20,
}

const cardStyle = {
  background: "#111",
  padding: 20,
  borderRadius: 20,
  border: "1px solid #222",
}

const iconBox = {
  width: 50,
  height: 50,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1a1a2e",
}

const statusTag = {
  fontSize: 12,
  background: "#222",
  padding: "4px 8px",
  borderRadius: 999,
}

const desc = {
  color: "#aaa",
  marginTop: 10,
}

const buttonPrimary = {
  display: "inline-block",
  marginTop: 12,
  padding: "10px 16px",
  borderRadius: 10,
  background: "linear-gradient(90deg,#7b2ff7,#f107a3)",
  color: "#fff",
  textDecoration: "none",
}

const panel = {
  background: "#111",
  padding: 20,
  borderRadius: 20,
}

const muted = { color: "#aaa" }

const fakeComment = {
  marginTop: 12,
  padding: 12,
  background: "#0c0c1a",
  borderRadius: 10,
}

const secondaryButton = {
  border: "1px solid #333",
  padding: "10px 16px",
  borderRadius: 10,
  color: "#fff",
  textDecoration: "none",
}