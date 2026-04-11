"use client";

import React from "react";
import Link from "next/link";

export default function IntegrationsPage() {
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
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "#ff3ea5",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              INTEGRAÇÕES
            </p>
            <h1 style={{ margin: "8px 0 0", fontSize: "36px", lineHeight: 1.1 }}>
              Instagram e Facebook
            </h1>
            <p
              style={{
                marginTop: "10px",
                color: "rgba(255,255,255,0.72)",
                maxWidth: "760px",
              }}
            >
              Conecte suas contas, acompanhe mensagens e prepare automações para
              responder mais rápido e vender mais.
            </p>
          </div>

          <Link href="/dashboard" style={secondaryButton}>
            Voltar ao dashboard
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "18px",
            marginBottom: "22px",
          }}
        >
          <IntegrationCard
            icon="📸"
            title="Instagram"
            status="Desconectado"
            description="Conecte seu Instagram profissional para receber DMs, comentários e iniciar automações."
            primaryAction="Conectar Instagram"
            secondaryAction="Ver detalhes"
          />

          <IntegrationCard
            icon="📘"
            title="Facebook"
            status="Desconectado"
            description="Conecte sua página do Facebook e centralize mensagens do Messenger no 67Flow."
            primaryAction="Conectar Facebook"
            secondaryAction="Ver detalhes"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.9fr",
            gap: "18px",
          }}
        >
          <div style={panelStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                marginBottom: "18px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: "24px" }}>Mensagens recentes</h2>
                <p style={mutedText}>
                  Quando a integração estiver ativa, as conversas aparecerão aqui.
                </p>
              </div>

              <button style={secondaryActionButton}>Atualizar</button>
            </div>

            <div style={messageItem}>
              <div>
                <strong>@lojateste</strong>
                <p style={mutedTextSmall}>
                  Olá, gostaria de saber o preço e prazo de entrega.
                </p>
              </div>
              <span style={tagPending}>Aguardando conexão</span>
            </div>

            <div style={messageItem}>
              <div>
                <strong>Facebook Messenger</strong>
                <p style={mutedTextSmall}>
                  Cliente interessado em atendimento automático via página.
                </p>
              </div>
              <span style={tagDraft}>Rascunho</span>
            </div>

            <div style={messageItem}>
              <div>
                <strong>Instagram Direct</strong>
                <p style={mutedTextSmall}>
                  Exemplo de fila unificada de atendimento.
                </p>
              </div>
              <span style={tagInfo}>Preview</span>
            </div>
          </div>

          <div style={{ display: "grid", gap: "18px" }}>
            <div style={panelStyle}>
              <h2 style={{ marginTop: 0, fontSize: "22px" }}>Automações</h2>
              <p style={mutedText}>
                Ative respostas automáticas para agilizar o atendimento.
              </p>

              <div style={{ display: "grid", gap: "12px", marginTop: "18px" }}>
                <MiniAutomation
                  title="Resposta inicial automática"
                  description="Responder ao receber uma DM no Instagram."
                  active={false}
                />
                <MiniAutomation
                  title="Encaminhar lead quente"
                  description="Direcionar para atendimento humano."
                  active={false}
                />
                <MiniAutomation
                  title="Mensagem fora do horário"
                  description="Avisar horários de atendimento."
                  active={true}
                />
              </div>
            </div>

            <div style={panelStyle}>
              <h2 style={{ marginTop: 0, fontSize: "22px" }}>Próximos passos</h2>
              <ul
                style={{
                  paddingLeft: "18px",
                  margin: "14px 0 0",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.8,
                }}
              >
                <li>Conectar conta Meta</li>
                <li>Selecionar página do Facebook</li>
                <li>Vincular Instagram profissional</li>
                <li>Definir automações iniciais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({
  icon,
  title,
  status,
  description,
  primaryAction,
  secondaryAction,
}: {
  icon: string;
  title: string;
  status: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              background: "linear-gradient(135deg, rgba(123,47,247,0.25), rgba(241,7,163,0.18))",
            }}
          >
            {icon}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "24px" }}>{title}</h3>
            <span
              style={{
                display: "inline-block",
                marginTop: "6px",
                padding: "5px 10px",
                borderRadius: "999px",
                fontSize: "13px",
                background: "rgba(255, 170, 0, 0.14)",
                color: "#ffcc66",
                border: "1px solid rgba(255, 170, 0, 0.18)",
              }}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      <p
        style={{
          color: "rgba(255,255,255,0.76)",
          lineHeight: 1.7,
          marginBottom: "20px",
        }}
      >
        {description}
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button style={primaryActionButton}>{primaryAction}</button>
        <button style={secondaryActionButton}>{secondaryAction}</button>
      </div>
    </div>
  );
}

function MiniAutomation({
  title,
  description,
  active,
}: {
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <div>
          <strong>{title}</strong>
          <p style={mutedTextSmall}>{description}</p>
        </div>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            background: active
              ? "rgba(90, 255, 160, 0.14)"
              : "rgba(255,255,255,0.08)",
            color: active ? "#7dffb0" : "rgba(255,255,255,0.72)",
            border: "1px solid rgba(255,255,255,0.08)",
            whiteSpace: "nowrap",
          }}
        >
          {active ? "Ativo" : "Inativo"}
        </span>
      </div>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: "24px",
};

const messageItem: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  padding: "16px 0",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const mutedText: React.CSSProperties = {
  marginTop: "8px",
  marginBottom: 0,
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.7,
};

const mutedTextSmall: React.CSSProperties = {
  margin: "6px 0 0",
  color: "rgba(255,255,255,0.68)",
  lineHeight: 1.6,
  fontSize: "14px",
};

const primaryActionButton: React.CSSProperties = {
  border: "none",
  padding: "12px 16px",
  borderRadius: "12px",
  background: "linear-gradient(90deg, #7b2ff7, #f107a3)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryActionButton: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  padding: "12px 16px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButton: React.CSSProperties = {
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.10)",
  padding: "12px 16px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontWeight: 700,
};

const tagPending: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  background: "rgba(255,170,0,0.14)",
  color: "#ffcc66",
  border: "1px solid rgba(255,170,0,0.18)",
  whiteSpace: "nowrap",
};

const tagDraft: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  background: "rgba(123,47,247,0.18)",
  color: "#c59cff",
  border: "1px solid rgba(123,47,247,0.2)",
  whiteSpace: "nowrap",
};

const tagInfo: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  background: "rgba(70,170,255,0.14)",
  color: "#7dc7ff",
  border: "1px solid rgba(70,170,255,0.18)",
  whiteSpace: "nowrap",
};