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
  created_at: string | null;
};

export default function LeadsPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);

  const [leads, setLeads] = useState<Lead[]>([]);
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
        <p style={{ color: "#e879f9", margin: 0, fontWeight: 800 }}>
          67FLOW CRM
        </p>

        <h1 style={{ margin: "10px 0", fontSize: "42px" }}>
          Leads capturados
        </h1>

        <p style={{ color: "rgba(255,255,255,.68)", fontSize: "17px" }}>
          Pessoas que comentaram ou chamaram no direct.
        </p>

        <div
          style={{
            marginTop: "28px",
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "30px",
            padding: "24px",
          }}
        >
          {loading ? (
            <p>Carregando leads...</p>
          ) : leads.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,.7)" }}>
              Nenhum lead capturado ainda.
            </p>
          ) : (
            <div style={{ display: "grid", gap: "14px" }}>
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  style={{
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: "22px",
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <strong>
                      {lead.username || lead.user_id || "Usuário sem nome"}
                    </strong>
                    <p style={muted}>{lead.message}</p>
                  </div>

                  <div>
                    <span style={badge}>
                      {lead.source === "dm" ? "Direct" : "Comentário"}
                    </span>
                    <p style={muted}>
                      Gatilho: {lead.trigger_used || "sem match"}
                    </p>
                  </div>

                  <div>
                    <p style={muted}>
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleString("pt-BR")
                        : "Sem data"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const muted: React.CSSProperties = {
  color: "rgba(255,255,255,.65)",
  marginBottom: 0,
};

const badge: React.CSSProperties = {
  display: "inline-block",
  background: "linear-gradient(90deg,#7c3aed,#ec4899)",
  padding: "8px 12px",
  borderRadius: "999px",
  fontWeight: 800,
  fontSize: "13px",
};