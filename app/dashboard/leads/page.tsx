"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

type Lead = {
  id: string;
  username: string;
  message: string;
  trigger: string;
  created_at: string;
};

export default function LeadsPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [filtered, setFiltered] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    setLoading(true);

    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    setLeads(data || []);
    setFiltered(data || []);

    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();

    const result = leads.filter(
      (lead) =>
        lead.username?.toLowerCase().includes(term) ||
        lead.message?.toLowerCase().includes(term) ||
        lead.trigger?.toLowerCase().includes(term)
    );

    setFiltered(result);
  }, [search, leads]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,.22), transparent 28%), #050510",
        color: "#fff",
        padding: "40px 28px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            color: "#e879f9",
            fontWeight: 900,
            letterSpacing: ".08em",
          }}
        >
          67FLOW CRM
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "52px",
          }}
        >
          Leads capturados
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,.7)",
            fontSize: "18px",
            lineHeight: 1.7,
            marginBottom: "28px",
          }}
        >
          Pessoas que comentaram ou chamaram no direct.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 220px 220px",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          <input
            placeholder="Buscar lead, comentário ou gatilho..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "18px",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.05)",
              color: "#fff",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <div style={miniCard}>
            <p style={miniLabel}>TOTAL</p>
            <h2 style={miniNumber}>{leads.length}</h2>
          </div>

          <button onClick={loadLeads} style={refreshButton}>
            {loading ? "Atualizando..." : "Atualizar"}
          </button>
        </div>

        {filtered.length === 0 ? (
          <div style={emptyBox}>
            Nenhum lead encontrado.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            {filtered.map((lead) => (
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
                      <strong
                        style={{
                          fontSize: "22px",
                        }}
                      >
                        @{lead.username || "instagram_user"}
                      </strong>

                      <span
                        style={{
                          background:
                            "linear-gradient(90deg,#7c3aed,#ec4899)",
                          padding: "8px 14px",
                          borderRadius: "999px",
                          fontSize: "14px",
                          fontWeight: 900,
                        }}
                      >
                        Comentário
                      </span>
                    </div>

                    <div
                      style={{
                        background: "rgba(255,255,255,.04)",
                        borderRadius: "18px",
                        padding: "18px",
                        marginBottom: "16px",
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,.82)",
                      }}
                    >
                      {lead.message}
                    </div>

                    <p
                      style={{
                        marginBottom: 0,
                        color: "#f0abfc",
                        fontWeight: 700,
                      }}
                    >
                      Gatilho: {lead.trigger}
                    </p>
                  </div>

                  <div
                    style={{
                      minWidth: "180px",
                      textAlign: "right",
                      color: "rgba(255,255,255,.68)",
                    }}
                  >
                    {new Date(lead.created_at).toLocaleString("pt-BR")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const card: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "26px",
  padding: "26px",
  boxShadow: "0 20px 60px rgba(0,0,0,.22)",
};

const emptyBox: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "26px",
  padding: "30px",
  color: "rgba(255,255,255,.72)",
};

const miniCard: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "20px",
  padding: "18px",
  textAlign: "center",
};

const miniLabel: React.CSSProperties = {
  margin: 0,
  color: "#f0abfc",
  fontWeight: 900,
};

const miniNumber: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: "38px",
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
