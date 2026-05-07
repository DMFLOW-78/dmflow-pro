"use client"

import { useEffect, useState } from "react"
import { createSupabaseClient } from "@/lib/supabase/client"

type Rule = {
  id: string
  channel: string
  account_id: string
  trigger_text: string
  response_text: string
  active: boolean
  created_at: string
}

const ACCOUNT_ID = "17841433249169574"

export default function FlowsPage() {
  const supabase = createSupabaseClient()

  const [rules, setRules] = useState<Rule[]>([])
  const [triggerText, setTriggerText] = useState("")
  const [responseText, setResponseText] = useState("")
  const [loading, setLoading] = useState(false)

  async function loadRules() {
    setLoading(true)

    const { data, error } = await supabase
      .from("automation_rules")
      .select("*")
      .eq("channel", "instagram")
      .eq("account_id", ACCOUNT_ID)
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setRules(data ?? [])
    }

    setLoading(false)
  }

  async function createRule() {
    if (!triggerText.trim() || !responseText.trim()) {
      alert("Preencha a palavra-chave e a resposta.")
      return
    }

    const { error } = await supabase.from("automation_rules").insert({
      channel: "instagram",
      account_id: ACCOUNT_ID,
      trigger_text: triggerText.trim().toLowerCase(),
      response_text: responseText.trim(),
      active: true,
    })

    if (error) {
      alert("Erro ao criar regra.")
      console.error(error)
      return
    }

    setTriggerText("")
    setResponseText("")
    await loadRules()
  }

  async function toggleRule(rule: Rule) {
    const { error } = await supabase
      .from("automation_rules")
      .update({ active: !rule.active })
      .eq("id", rule.id)

    if (error) {
      alert("Erro ao atualizar regra.")
      console.error(error)
      return
    }

    await loadRules()
  }

  async function deleteRule(id: string) {
    const ok = confirm("Deseja excluir esta regra?")
    if (!ok) return

    const { error } = await supabase
      .from("automation_rules")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Erro ao excluir regra.")
      console.error(error)
      return
    }

    await loadRules()
  }

  useEffect(() => {
    loadRules()
  }, [])

  return (
    <main style={{ padding: 32, color: "white", background: "#070711", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>Fluxos</h1>
      <p style={{ color: "#b8b8c8", marginBottom: 32 }}>
        Crie respostas automáticas para mensagens recebidas no Instagram.
      </p>

      <section
        style={{
          background: "#11111d",
          border: "1px solid #29293a",
          borderRadius: 20,
          padding: 24,
          marginBottom: 32,
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Nova automação</h2>

        <label>Palavra-chave</label>
        <input
          value={triggerText}
          onChange={(e) => setTriggerText(e.target.value)}
          placeholder="Ex: preço"
          style={{
            width: "100%",
            padding: 14,
            marginTop: 8,
            marginBottom: 18,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#080812",
            color: "white",
          }}
        />

        <label>Resposta automática</label>
        <textarea
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder="Ex: Olá! Nosso plano começa em R$29/mês."
          rows={4}
          style={{
            width: "100%",
            padding: 14,
            marginTop: 8,
            marginBottom: 18,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#080812",
            color: "white",
          }}
        />

        <button
          onClick={createRule}
          style={{
            padding: "14px 22px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(90deg, #8b2cff, #ff00a8)",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Criar automação
        </button>
      </section>

      <section
        style={{
          background: "#11111d",
          border: "1px solid #29293a",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Automações cadastradas</h2>

        {loading && <p>Carregando...</p>}

        {!loading && rules.length === 0 && (
          <p style={{ color: "#b8b8c8" }}>Nenhuma automação cadastrada ainda.</p>
        )}

        {rules.map((rule) => (
          <div
            key={rule.id}
            style={{
              border: "1px solid #29293a",
              borderRadius: 16,
              padding: 18,
              marginBottom: 14,
              background: "#080812",
            }}
          >
            <strong>Quando receber:</strong>
            <p style={{ color: "#ff4fd8", fontSize: 20 }}>{rule.trigger_text}</p>

            <strong>Responder:</strong>
            <p style={{ color: "#ddd" }}>{rule.response_text}</p>

            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button onClick={() => toggleRule(rule)}>
                {rule.active ? "Desativar" : "Ativar"}
              </button>

              <button onClick={() => deleteRule(rule.id)}>
                Excluir
              </button>

              <span>
                Status: {rule.active ? "Ativo" : "Inativo"}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}