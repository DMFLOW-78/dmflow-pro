"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

type Rule = {
  id: string;
  trigger_text: string;
  response_text: string;
  active: boolean;
};

export default function FlowsPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);

  const [rules, setRules] = useState<Rule[]>([]);
  const [trigger, setTrigger] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTrigger, setEditTrigger] = useState("");
  const [editResponse, setEditResponse] = useState("");

  async function loadRules() {
    const { data } = await supabase
      .from("automation_rules")
      .select("*")
      .order("created_at", { ascending: false });

    setRules(data || []);
  }

  useEffect(() => {
    loadRules();
  }, []);

  async function createRule() {
    if (!trigger.trim() || !response.trim()) return;

    setLoading(true);

    await supabase.from("automation_rules").insert({
      trigger_text: trigger.trim(),
      response_text: response.trim(),
      active: true,
      account_id: "17841433249169574",
    });

    setTrigger("");
    setResponse("");
    await loadRules();
    setLoading(false);
  }

  function startEdit(rule: Rule) {
    setEditingId(rule.id);
    setEditTrigger(rule.trigger_text);
    setEditResponse(rule.response_text);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTrigger("");
    setEditResponse("");
  }

  async function saveEdit(id: string) {
    if (!editTrigger.trim() || !editResponse.trim()) return;

    setLoading(true);

    await supabase
      .from("automation_rules")
      .update({
        trigger_text: editTrigger.trim(),
        response_text: editResponse.trim(),
      })
      .eq("id", id);

    cancelEdit();
    await loadRules();
    setLoading(false);
  }

  async function deleteRule(id: string) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta automação?"
    );

    if (!confirmed) return;

    setLoading(true);

    await supabase.from("automation_rules").delete().eq("id", id);

    await loadRules();
    setLoading(false);
  }

  async function toggleRule(id: string, active: boolean) {
    await supabase
      .from("automation_rules")
      .update({ active: !active })
      .eq("id", id);

    await loadRules();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,.25), transparent 28%), #050510",
        color: "#fff",
        padding: "30px",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ marginBottom: "34px" }}>
          <p
            style={{
              color: "#e879f9",
              margin: 0,
              fontWeight: 800,
              letterSpacing: ".08em",
            }}
          >
            67FLOW AUTOMATIONS
          </p>

          <h1 style={{ margin: "10px 0", fontSize: "42px" }}>
            Fluxos automáticos
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,.68)",
              maxWidth: "720px",
              lineHeight: 1.7,
              fontSize: "17px",
            }}
          >
            Crie, edite e gerencie automações para responder comentários e
            directs do Instagram usando palavras-chave.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr .8fr",
            gap: "22px",
            marginBottom: "24px",
          }}
        >
          <div style={panelStyle}>
            <h2 style={{ marginTop: 0, fontSize: "28px" }}>
              Nova automação
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,.62)",
                marginBottom: "24px",
                lineHeight: 1.6,
              }}
            >
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

          <div style={summaryStyle}>
            <p
              style={{
                color: "#f0abfc",
                fontWeight: 800,
                marginTop: 0,
              }}
            >
              RESUMO
            </p>

            <h2 style={{ fontSize: "56px", margin: "0 0 10px" }}>
              {rules.length}
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,.75)",
                fontSize: "18px",
                lineHeight: 1.7,
              }}
            >
              automações cadastradas no seu Instagram.
            </p>

            <div style={{ marginTop: "30px", display: "grid", gap: "14px" }}>
              <MiniCard
                titulo="Comentários automáticos"
                texto="Responder comentários por palavra-chave."
              />
              <MiniCard
                titulo="DM automática"
                texto="Direct pronto no código. Depende da liberação Meta."
              />
              <MiniCard
                titulo="Captura de leads"
                texto="Enviar links, checkout e direcionar clientes."
              />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: "18px" }}>
          {rules.map((rule) => {
            const isEditing = editingId === rule.id;

            return (
              <div key={rule.id} style={ruleCardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        color: "#f0abfc",
                        marginTop: 0,
                        fontWeight: 800,
                        letterSpacing: ".04em",
                      }}
                    >
                      PALAVRAS-CHAVE
                    </p>

                    {isEditing ? (
                      <>
                        <input
                          value={editTrigger}
                          onChange={(e) => setEditTrigger(e.target.value)}
                          style={inputStyle}
                        />

                        <textarea
                          value={editResponse}
                          onChange={(e) => setEditResponse(e.target.value)}
                          style={{
                            ...inputStyle,
                            minHeight: "120px",
                            resize: "vertical",
                          }}
                        />

                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            onClick={() => saveEdit(rule.id)}
                            style={primarySmallButton}
                          >
                            Salvar
                          </button>

                          <button onClick={cancelEdit} style={secondaryButton}>
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 style={{ marginTop: "6px", fontSize: "30px" }}>
                          {rule.trigger_text}
                        </h2>

                        <div
                          style={{
                            marginTop: "18px",
                            padding: "18px",
                            borderRadius: "18px",
                            background: "rgba(255,255,255,.04)",
                            color: "rgba(255,255,255,.82)",
                            lineHeight: 1.7,
                          }}
                        >
                          {rule.response_text}
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: "10px",
                      height: "fit-content",
                      minWidth: "130px",
                    }}
                  >
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

                    {!isEditing && (
                      <button
                        onClick={() => startEdit(rule)}
                        style={secondaryButton}
                      >
                        Editar
                      </button>
                    )}

                    <button
                      onClick={() => deleteRule(rule.id)}
                      style={dangerButton}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function MiniCard({
  titulo,
  texto,
}: {
  titulo: string;
  texto: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "20px",
        padding: "18px",
      }}
    >
      <strong>{titulo}</strong>
      <p
        style={{
          marginBottom: 0,
          color: "rgba(255,255,255,.7)",
          lineHeight: 1.6,
        }}
      >
        {texto}
      </p>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "30px",
  padding: "30px",
  boxShadow: "0 25px 80px rgba(0,0,0,.28)",
};

const summaryStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(124,58,237,.24), rgba(236,72,153,.18))",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "30px",
  padding: "30px",
};

const ruleCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "26px",
  padding: "26px",
  boxShadow: "0 20px 60px rgba(0,0,0,.22)",
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
  fontWeight: 800,
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 10px 40px rgba(124,58,237,.45)",
};

const primarySmallButton: React.CSSProperties = {
  ...primaryButton,
  padding: "12px 18px",
  fontSize: "14px",
};

const secondaryButton: React.CSSProperties = {
  background: "rgba(255,255,255,.07)",
  border: "1px solid rgba(255,255,255,.12)",
  color: "#fff",
  borderRadius: "14px",
  padding: "12px 16px",
  fontWeight: 800,
  cursor: "pointer",
};

const dangerButton: React.CSSProperties = {
  background: "rgba(239,68,68,.16)",
  border: "1px solid rgba(239,68,68,.25)",
  color: "#ff7d7d",
  borderRadius: "14px",
  padding: "12px 16px",
  fontWeight: 800,
  cursor: "pointer",
};

const statusButton: React.CSSProperties = {
  border: "none",
  borderRadius: "14px",
  padding: "12px 16px",
  fontWeight: 900,
  cursor: "pointer",
};