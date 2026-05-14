"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

type Rule = {
  id: string;
  account_id: string | null;
  trigger_text: string;
  response_text: string;
  channel: string;
  active: boolean;
  created_at?: string;
};

const INSTAGRAM_ACCOUNT_ID = "17841433249169574";

export default function FlowsPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);

  const [rules, setRules] = useState<Rule[]>([]);
  const [trigger, setTrigger] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function loadRules() {
    setErro("");

    const { data, error } = await supabase
      .from("automation_rules")
      .select("*")
      .eq("account_id", INSTAGRAM_ACCOUNT_ID)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("ERRO AO CARREGAR AUTOMAÇÕES:", error);
      setErro(error.message);
      return;
    }

    setRules(data || []);
  }

  useEffect(() => {
    loadRules();
  }, []);

  async function createRule() {
    setErro("");
    setSucesso("");

    if (!trigger.trim()) {
      setErro("Digite uma palavra-chave.");
      return;
    }

    if (!response.trim()) {
      setErro("Digite uma resposta automática.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("automation_rules").insert({
      account_id: INSTAGRAM_ACCOUNT_ID,
      trigger_text: trigger.trim().toLowerCase(),
      response_text: response.trim(),
      channel: "comments",
      active: true,
    });

    if (error) {
      console.log("ERRO AO CRIAR AUTOMAÇÃO:", error);
      setErro(error.message);
      setLoading(false);
      return;
    }

    setTrigger("");
    setResponse("");
    setSucesso("Automação criada com sucesso.");

    await loadRules();

    setLoading(false);
  }

  async function toggleRule(id: string, active: boolean) {
    setErro("");

    const { error } = await supabase
      .from("automation_rules")
      .update({ active: !active })
      .eq("id", id);

    if (error) {
      setErro(error.message);
      return;
    }

    await loadRules();
  }

  async function deleteRule(id: string) {
    const confirmed = window.confirm("Deseja excluir esta automação?");

    if (!confirmed) return;

    const { error } = await supabase
      .from("automation_rules")
      .delete()
      .eq("id", id);

    if (error) {
      setErro(error.message);
      return;
    }

    await loadRules();
  }

  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <p style={eyebrow}>67FLOW AUTOMATIONS</p>

        <h1 style={title}>Fluxos automáticos</h1>

        <p style={subtitle}>
          Crie automações para responder comentários e mensagens usando
          palavras-chave.
        </p>

        {erro && <div style={errorBox}>Erro: {erro}</div>}

        {sucesso && <div style={successBox}>{sucesso}</div>}

        <div style={grid}>
          <div style={card}>
            <h2 style={cardTitle}>Nova automação</h2>

            <p style={muted}>
              Exemplo:
              <br />
              Palavra-chave: quero, preço, link
              <br />
              Resposta: “Me chama no direct ou acesse nosso site 😉”
            </p>

            <input
              placeholder="Digite palavras-chave separadas por vírgula"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Digite a resposta automática"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              style={{
                ...inputStyle,
                minHeight: "150px",
                resize: "vertical",
              }}
            />

            <button
              onClick={createRule}
              disabled={loading}
              style={primaryButton}
            >
              {loading ? "Salvando..." : "Criar automação"}
            </button>
          </div>

          <div style={summaryCard}>
            <p style={eyebrow}>RESUMO</p>

            <h2 style={{ fontSize: "56px", margin: "0 0 10px" }}>
              {rules.length}
            </h2>

            <p style={muted}>automações cadastradas no seu Instagram.</p>

            <MiniCard
              title="Comentários automáticos"
              text="Responder comentários por palavra-chave."
            />

            <MiniCard
              title="DM automática"
              text="Direct pronto no código. Depende da liberação Meta."
            />

            <MiniCard
              title="Captura de leads"
              text="Enviar links, checkout e direcionar clientes."
            />
          </div>
        </div>

        <div style={{ display: "grid", gap: "18px", marginTop: "24px" }}>
          {rules.length === 0 ? (
            <div style={emptyBox}>Nenhuma automação criada ainda.</div>
          ) : (
            rules.map((rule) => (
              <div key={rule.id} style={ruleCard}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={eyebrow}>PALAVRA-CHAVE</p>

                    <h2 style={{ marginTop: "8px", fontSize: "30px" }}>
                      {rule.trigger_text}
                    </h2>

                    <div style={messageBox}>{rule.response_text}</div>
                  </div>

                  <div style={{ display: "grid", gap: "10px", minWidth: 140 }}>
                    <button
                      onClick={() => toggleRule(rule.id, rule.active)}
                      style={{
                        ...statusButton,
                        background: rule.active
                          ? "rgba(34,197,94,.16)"
                          : "rgba(239,68,68,.16)",
                        color: rule.active ? "#4ade80" : "#ff7d7d",
                      }}
                    >
                      {rule.active ? "ATIVO" : "INATIVO"}
                    </button>

                    <button
                      onClick={() => deleteRule(rule.id)}
                      style={dangerButton}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function MiniCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div style={miniCard}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>

      <p style={muted}>{text}</p>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "40px",
  color: "#fff",
  background:
    "linear-gradient(135deg, #0b0220 0%, #14052c 45%, #2a093d 100%)",
};

const eyebrow: React.CSSProperties = {
  color: "#f472b6",
  fontWeight: 900,
  letterSpacing: "1px",
  fontSize: "14px",
};

const title: React.CSSProperties = {
  fontSize: "58px",
  marginTop: "10px",
  marginBottom: "10px",
};

const subtitle: React.CSSProperties = {
  color: "rgba(255,255,255,.7)",
  marginBottom: "40px",
  fontSize: "18px",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.3fr .9fr",
  gap: "24px",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "32px",
  padding: "30px",
  backdropFilter: "blur(12px)",
};

const summaryCard: React.CSSProperties = {
  ...card,
  background: "rgba(168,85,247,.14)",
};

const cardTitle: React.CSSProperties = {
  marginTop: 0,
  fontSize: "32px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "18px",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,.08)",
  background: "rgba(255,255,255,.04)",
  color: "#fff",
  fontSize: "16px",
  outline: "none",
};

const primaryButton: React.CSSProperties = {
  background: "linear-gradient(90deg, #7c3aed 0%, #ec4899 100%)",
  border: "none",
  color: "#fff",
  padding: "16px 24px",
  borderRadius: "16px",
  fontWeight: 900,
  fontSize: "16px",
  cursor: "pointer",
};

const muted: React.CSSProperties = {
  color: "rgba(255,255,255,.7)",
  lineHeight: 1.7,
};

const miniCard: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "20px",
  padding: "18px",
  marginTop: "14px",
};

const emptyBox: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "24px",
  padding: "24px",
  color: "rgba(255,255,255,.7)",
};

const ruleCard: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "26px",
  padding: "26px",
};

const messageBox: React.CSSProperties = {
  marginTop: "18px",
  padding: "18px",
  borderRadius: "18px",
  background: "rgba(255,255,255,.04)",
  color: "rgba(255,255,255,.82)",
  lineHeight: 1.7,
};

const statusButton: React.CSSProperties = {
  border: "none",
  borderRadius: "14px",
  padding: "12px 16px",
  fontWeight: 900,
  cursor: "pointer",
};

const dangerButton: React.CSSProperties = {
  background: "rgba(239,68,68,.16)",
  border: "1px solid rgba(239,68,68,.25)",
  color: "#ff7d7d",
  borderRadius: "14px",
  padding: "12px 16px",
  fontWeight: 900,
  cursor: "pointer",
};

const errorBox: React.CSSProperties = {
  background: "rgba(239,68,68,.14)",
  color: "#ff7d7d",
  border: "1px solid rgba(239,68,68,.22)",
  padding: "18px",
  borderRadius: "18px",
  marginBottom: "20px",
  fontWeight: 800,
};

const successBox: React.CSSProperties = {
  background: "rgba(34,197,94,.14)",
  color: "#4ade80",
  border: "1px solid rgba(34,197,94,.22)",
  padding: "18px",
  borderRadius: "18px",
  marginBottom: "20px",
  fontWeight: 800,
};