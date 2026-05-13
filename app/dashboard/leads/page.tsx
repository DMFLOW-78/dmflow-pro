"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

type Lead = {
  id: string;
  username: string | null;
  user_id: string | null;
  source: string | null;
  message: string | null;
  trigger_used: string | null;
  status: string | null;
  created_at: string | null;
};

export default function LeadsPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    setLoading(true);

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setLeads(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from("leads").update({ status }).eq("id", id);
    await loadLeads();
  }

  const filtered = leads.filter((lead) => {
    const term = search.toLowerCase();

    return (
      lead.username?.toLowerCase().includes(term) ||
      lead.user_id?.toLowerCase().includes(term) ||
      lead.message?.toLowerCase().includes(term) ||
      lead.trigger_used?.toLowerCase().includes(term) ||
      lead.status?.toLowerCase().includes(term)
    );
  });

  const total = leads.length;
  const novos = leads.filter((lead) => (lead.status || "novo") === "novo").length;
  const quentes = leads.filter((lead) => lead.status === "quente").length;
  const clientes = leads.filter((lead) => lead.status === "cliente").length;

  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={eyebrow}>67FLOW CRM</p>

        <h1 style={title}>Leads capturados</h1>

        <p style={subtitle}>
          Pessoas que comentaram ou chamaram no direct.
        </p>

        <div style={topGrid}>
          <input
            placeholder="Buscar lead, comentário, gatilho ou status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />

          <Metric title="TOTAL" value={total} />
          <Metric title="NOVOS" value={novos} />
          <Metric title="QUENTES" value={quentes} />
          <Metric title="CLIENTES" value={clientes} />

          <button onClick={loadLeads} style={refreshButton}>
            {loading ? "Atualizando..." : "Atualizar"}
          </button>
        </div>

        {filtered.length === 0 ? (
          <div style={emptyBox}>Nenhum lead encontrado.</div>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {filtered.map((lead) => {
              const status = lead.status || "novo";

              return (
                <div key={lead.id} style={card}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          marginBottom: "14px",
                          flexWrap: "wrap",
                        }}
                      >
                        <strong style={{ fontSize: "22px" }}>
                          {lead.username
                            ? `@${lead.username}`
                            : lead.user_id || "Usuário sem nome"}
                        </strong>

                        <span style={sourceBadge}>
                          {lead.source === "dm" ? "Direct" : "Comentário"}
                        </span>

                        <span style={getStatusBadge(status)}>
                          {formatStatus(status)}
                        </span>
                      </div>

                      <div style={messageBox}>
                        {lead.message || "Sem mensagem"}
                      </div>

                      <p style={triggerText}>
                        Gatilho: {lead.trigger_used || "sem match"}
                      </p>

                      <div style={actionsGrid}>
                        <StatusButton
                          label="Novo"
                          active={status === "novo"}
                          onClick={() => updateStatus(lead.id, "novo")}
                        />

                        <StatusButton
                          label="Quente"
                          active={status === "quente"}
                          onClick={() => updateStatus(lead.id, "quente")}
                        />

                        <StatusButton
                          label="Respondido"
                          active={status === "respondido"}
                          onClick={() => updateStatus(lead.id, "respondido")}
                        />

                        <StatusButton
                          label="Cliente"
                          active={status === "cliente"}
                          onClick={() => updateStatus(lead.id, "cliente")}
                        />
                      </div>
                    </div>

                    <div style={dateBox}>
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleString("pt-BR")
                        : "Sem data"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <div style={metricCard}>
      <p style={metricLabel}>{title}</p>
      <h2 style={metricValue}>{value}</h2>
    </div>
  );
}

function StatusButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: "14px",
        padding: "12px 14px",
        cursor: "pointer",
        fontWeight: 900,
        color: "#fff",
        background: active
          ? "linear-gradient(90deg,#7c3aed,#ec4899)"
          : "rgba(255,255,255,.06)",
      }}
    >
      {label}
    </button>
  );
}

function formatStatus(status: string) {
  const map: Record<string, string> = {
    novo: "Novo",
    quente: "Quente",
    respondido: "Respondido",
    cliente: "Cliente",
  };

  return map[status] || "Novo";
}

function getStatusBadge(status: string): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 900,
  };

  if (status === "cliente") {
    return {
      ...base,
      color: "#4ade80",
      background: "rgba(34,197,94,.16)",
    };
  }

  if (status === "quente") {
    return {
      ...base,
      color: "#fbbf24",
      background: "rgba(251,191,36,.16)",
    };
  }

  if (status === "respondido") {
    return {
      ...base,
      color: "#60a5fa",
      background: "rgba(96,165,250,.16)",
    };
  }

  return {
    ...base,
    color: "#f0abfc",
    background: "rgba(236,72,153,.16)",
  };
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,.22), transparent 28%), #050510",
  color: "#fff",
  padding: "40px 28px",
};

const eyebrow: React.CSSProperties = {
  color: "#e879f9",
  fontWeight: 900,
  letterSpacing: ".08em",
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: "52px",
};

const subtitle: React.CSSProperties = {
  color: "rgba(255,255,255,.7)",
  fontSize: "18px",
  lineHeight: 1.7,
  marginBottom: "28px",
};

const topGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.4fr repeat(4, 130px) 170px",
  gap: "14px",
  marginBottom: "24px",
};

const searchInput: React.CSSProperties = {
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,.08)",
  background: "rgba(255,255,255,.05)",
  color: "#fff",
  fontSize: "16px",
  outline: "none",
};

const metricCard: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "20px",
  padding: "14px",
  textAlign: "center",
};

const metricLabel: React.CSSProperties = {
  margin: 0,
  color: "#f0abfc",
  fontWeight: 900,
  fontSize: "12px",
};

const metricValue: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: "30px",
};

const refreshButton: React.CSSProperties = {
  border: "none",
  borderRadius: "20px",
  background: "linear-gradient(90deg,#7c3aed,#ec4899)",
  color: "#fff",
  fontWeight: 900,
  cursor: "pointer",
  fontSize: "16px",
};

const emptyBox: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "26px",
  padding: "30px",
  color: "rgba(255,255,255,.72)",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "26px",
  padding: "26px",
  boxShadow: "0 20px 60px rgba(0,0,0,.22)",
};

const sourceBadge: React.CSSProperties = {
  background: "linear-gradient(90deg,#7c3aed,#ec4899)",
  padding: "8px 14px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 900,
};

const messageBox: React.CSSProperties = {
  background: "rgba(255,255,255,.04)",
  borderRadius: "18px",
  padding: "18px",
  marginBottom: "16px",
  lineHeight: 1.7,
  color: "rgba(255,255,255,.82)",
};

const triggerText: React.CSSProperties = {
  marginBottom: "18px",
  color: "#f0abfc",
  fontWeight: 700,
};

const actionsGrid: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const dateBox: React.CSSProperties = {
  minWidth: "180px",
  textAlign: "right",
  color: "rgba(255,255,255,.68)",
};