"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";

type Workspace = {
  plan?: string | null;
  expires_at?: string | null;
};

export default function DashboardPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);

  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("workspaces")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) {
        setErro("Não foi possível carregar os dados do workspace.");
        setLoading(false);
        return;
      }

      setWorkspace(data);
      setLoading(false);
    }

    load();
  }, [supabase]);

  const plano = workspace?.plan || "free";

  const expiraEm = workspace?.expires_at
    ? new Date(workspace.expires_at).toLocaleDateString("pt-BR")
    : "Sem data";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 32%), radial-gradient(circle at top right, rgba(236,72,153,.28), transparent 30%), #050510",
        color: "#fff",
        padding: "28px",
      }}
    >
      <section style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 34,
          }}
        >
          <div>
            <p style={{ margin: 0, color: "#e879f9", fontWeight: 800 }}>
              67FLOW
            </p>
            <h1 style={{ margin: "8px 0 0", fontSize: 42 }}>
              Painel de automações
            </h1>
            <p style={{ color: "rgba(255,255,255,.65)", fontSize: 16 }}>
              Responda comentários, capture leads e venda pelo Instagram.
            </p>
          </div>

          <Link href="/" style={buttonSecondary}>
            Home
          </Link>
        </header>

        {loading ? (
          <Box>Carregando painel...</Box>
        ) : erro ? (
          <Box>{erro}</Box>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr .8fr .8fr",
                gap: 18,
                marginBottom: 22,
              }}
            >
              <Metric
                title="Plano atual"
                value={plano.toUpperCase()}
                subtitle="Conta pronta para testes"
                highlight
              />
              <Metric title="Expiração" value={expiraEm} subtitle="Validade do acesso" />
              <Metric
                title="Status"
                value={plano === "free" ? "Gratuita" : "Ativa"}
                subtitle="Workspace conectado"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr .7fr",
                gap: 22,
              }}
            >
              <div style={heroCard}>
                <span style={badge}>AUTOMAÇÃO PRINCIPAL</span>

                <h2 style={{ fontSize: 34, margin: "16px 0 10px" }}>
                  Transforme comentários em conversas no direct
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,.72)",
                    fontSize: 17,
                    lineHeight: 1.7,
                    maxWidth: 720,
                  }}
                >
                  Configure palavras-chave como “quero”, “preço” ou “link” e o
                  67Flow responde automaticamente seus comentários. Quando o
                  cliente chamar no direct, o sistema identifica a palavra-chave
                  e prepara a resposta automática.
                </p>

                <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
                  <Link href="/dashboard/flows" style={buttonPrimary}>
                    Criar automação
                  </Link>
                  <Link href="/dashboard/integrations" style={buttonSecondary}>
                    Ver integrações
                  </Link>
                </div>
              </div>

              <div style={sideCard}>
                <h3 style={{ marginTop: 0, fontSize: 24 }}>Próximos passos</h3>

                <Step number="1" text="Criar palavras-chave" />
                <Step number="2" text="Definir resposta automática" />
                <Step number="3" text="Testar no Instagram" />
                <Step number="4" text="Ativar cobrança mensal" />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
                marginTop: 22,
              }}
            >
              <Feature title="Comentários" text="Resposta automática por palavra-chave." />
              <Feature title="Direct" text="Webhook de DM já recebendo mensagens." />
              <Feature title="Vendas" text="Ideal para link, checkout e captação." />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function Metric({
  title,
  value,
  subtitle,
  highlight = false,
}: {
  title: string;
  value: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        padding: 24,
        borderRadius: 26,
        background: highlight
          ? "linear-gradient(135deg, rgba(147,51,234,.45), rgba(236,72,153,.28))"
          : "rgba(255,255,255,.055)",
        border: "1px solid rgba(255,255,255,.1)",
        boxShadow: "0 20px 60px rgba(0,0,0,.28)",
      }}
    >
      <p style={{ margin: 0, color: "rgba(255,255,255,.62)" }}>{title}</p>
      <h2 style={{ margin: "10px 0 6px", fontSize: 30 }}>{value}</h2>
      <p style={{ margin: 0, color: "rgba(255,255,255,.55)", fontSize: 14 }}>
        {subtitle}
      </p>
    </div>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
      <strong
        style={{
          width: 32,
          height: 32,
          borderRadius: 999,
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg,#7c3aed,#ec4899)",
        }}
      >
        {number}
      </strong>
      <span style={{ color: "rgba(255,255,255,.78)" }}>{text}</span>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div style={smallCard}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,.65)", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function Box({ children }: { children: React.ReactNode }) {
  return <div style={smallCard}>{children}</div>;
}

const heroCard: React.CSSProperties = {
  padding: 34,
  borderRadius: 30,
  background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.1)",
  boxShadow: "0 24px 80px rgba(0,0,0,.32)",
};

const sideCard: React.CSSProperties = {
  padding: 28,
  borderRadius: 30,
  background: "rgba(255,255,255,.055)",
  border: "1px solid rgba(255,255,255,.1)",
};

const smallCard: React.CSSProperties = {
  padding: 24,
  borderRadius: 24,
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.09)",
};

const badge: React.CSSProperties = {
  color: "#f0abfc",
  fontWeight: 900,
  fontSize: 13,
  letterSpacing: ".08em",
};

const buttonPrimary: React.CSSProperties = {
  textDecoration: "none",
  color: "#fff",
  padding: "14px 20px",
  borderRadius: 16,
  fontWeight: 800,
  background: "linear-gradient(90deg,#7c3aed,#ec4899)",
};

const buttonSecondary: React.CSSProperties = {
  textDecoration: "none",
  color: "#fff",
  padding: "14px 20px",
  borderRadius: 16,
  fontWeight: 700,
  background: "rgba(255,255,255,.07)",
  border: "1px solid rgba(255,255,255,.12)",
};