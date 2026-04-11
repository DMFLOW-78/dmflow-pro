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
      setLoading(true);
      setErro("");

      const { data, error } = await supabase
        .from("workspaces")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(error);
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
    ? new Date(workspace.expires_at).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "Sem data";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(255,0,102,0.18), transparent 20%), #070812",
        color: "#fff",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                color: "#c13cff",
                margin: 0,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              PAINEL 67FLOW
            </p>
            <h1 style={{ margin: "8px 0 0", fontSize: "36px", lineHeight: 1.1 }}>
              Dashboard
            </h1>
          </div>

          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "12px 16px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            Voltar para a home
          </Link>
        </div>

        {loading ? (
          <div
            style={{
              background: "#121320",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            Carregando dados...
          </div>
        ) : erro ? (
          <div
            style={{
              background: "rgba(255, 70, 70, 0.08)",
              border: "1px solid rgba(255, 70, 70, 0.25)",
              color: "#ff7d7d",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            {erro}
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "18px",
                marginBottom: "22px",
              }}
            >
              <Card
                titulo="Plano atual"
                valor={plano.toUpperCase()}
                destaque
              />
              <Card
                titulo="Expiração"
                valor={expiraEm}
              />
              <Card
                titulo="Status"
                valor={plano === "free" ? "Conta gratuita" : "Ativa"}
              />
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "28px",
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: "26px" }}>
                Bem-vindo ao 67Flow
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,0.78)",
                  fontSize: "17px",
                  lineHeight: 1.7,
                  maxWidth: "760px",
                }}
              >
                Seu painel já está conectado. Agora podemos evoluir isso para um
                visual profissional com blocos de leads, integrações, status da
                assinatura, automações e métricas principais.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                <Botao href="/dashboard/leads" texto="Ver leads" />
                <Botao href="/dashboard/integrations" texto="Integrações" secundario />
                <Botao href="/dashboard/flows" texto="Fluxos" secundario />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Card({
  titulo,
  valor,
  destaque = false,
}: {
  titulo: string;
  valor: string;
  destaque?: boolean;
}) {
  return (
    <div
      style={{
        background: destaque
          ? "linear-gradient(135deg, rgba(123,47,247,0.22), rgba(241,7,163,0.16))"
          : "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "22px",
        padding: "22px",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "rgba(255,255,255,0.65)",
          fontSize: "14px",
        }}
      >
        {titulo}
      </p>
      <h3
        style={{
          margin: "10px 0 0",
          fontSize: "24px",
          lineHeight: 1.3,
        }}
      >
        {valor}
      </h3>
    </div>
  );
}

function Botao({
  href,
  texto,
  secundario = false,
}: {
  href: string;
  texto: string;
  secundario?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        padding: "12px 18px",
        borderRadius: "12px",
        color: "#fff",
        background: secundario
          ? "rgba(255,255,255,0.06)"
          : "linear-gradient(90deg, #7b2ff7, #f107a3)",
        border: secundario ? "1px solid rgba(255,255,255,0.08)" : "none",
        fontWeight: 700,
      }}
    >
      {texto}
    </Link>
  );
}