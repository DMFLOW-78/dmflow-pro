"use client";

export default function IntegrationsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,.25), transparent 28%), #050510",
        color: "#fff",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={eyebrow}>67FLOW INTEGRATIONS</p>

          <h1 style={{ fontSize: 54, margin: 0 }}>Integrações</h1>

          <p style={subtitle}>
            Veja o status da conexão do Instagram e das automações do seu
            67Flow.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div style={primaryCard}>
            <div style={cardHeader}>
              <h2 style={cardTitle}>Instagram</h2>
              <StatusBadge text="CONECTADO" color="green" />
            </div>

            <div style={infoGrid}>
              <InfoCard title="Conta conectada" value="@adsmarcelosilva" />
              <InfoCard title="Comentários automáticos" value="Funcionando" />
              <InfoCard title="Captura de leads" value="Ativa" />
              <InfoCard title="Mensagens no direct" value="Em configuração" />
            </div>

            <button
              type="button"
              onClick={() => window.open("https://instagram.com", "_blank")}
              style={primaryButton}
            >
              Abrir Instagram
            </button>
          </div>

          <div style={secondaryCard}>
            <h2 style={cardTitle}>Status da automação</h2>

            <div style={{ ...infoGrid, marginTop: 30 }}>
              <InfoCard title="Sistema" value="Online" />
              <InfoCard title="Webhook" value="Ativo" />
              <InfoCard title="Leads" value="Capturando" />
              <InfoCard title="Plano" value="Gratuito" />
            </div>

            <div style={noticeBox}>
              <strong style={noticeTitle}>Sistema pronto para uso</strong>
              Seu Instagram já está conectado ao 67Flow. As automações de
              comentários e captura de leads estão funcionando normalmente.
            </div>
          </div>
        </div>

        <div style={bottomGrid}>
          <FeatureCard
            title="Comentários automáticos"
            text="Responda comentários com base em palavras-chave como quero, preço ou link."
          />

          <FeatureCard
            title="Leads capturados"
            text="Cada pessoa que comenta ou chama no direct pode aparecer no CRM."
          />

          <FeatureCard
            title="Direct automático"
            text="O recebimento de mensagens já funciona. O envio automático depende da liberação da Meta."
          />
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div style={infoCard}>
      <p style={infoTitle}>{title}</p>
      <h3 style={infoValue}>{value}</h3>
    </div>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div style={featureCard}>
      <h3 style={{ marginTop: 0, fontSize: 22 }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>{text}</p>
    </div>
  );
}

function StatusBadge({
  text,
  color,
}: {
  text: string;
  color: "green" | "yellow";
}) {
  return (
    <div
      style={{
        background:
          color === "green" ? "rgba(34,197,94,.16)" : "rgba(250,204,21,.16)",
        color: color === "green" ? "#4ade80" : "#fde047",
        padding: "10px 16px",
        borderRadius: 14,
        fontWeight: 900,
        fontSize: 14,
      }}
    >
      {text}
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  color: "#e879f9",
  fontWeight: 900,
  letterSpacing: ".08em",
  marginBottom: 10,
};

const subtitle: React.CSSProperties = {
  color: "rgba(255,255,255,.7)",
  fontSize: 18,
  marginTop: 14,
  maxWidth: 700,
  lineHeight: 1.7,
};

const primaryCard: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(124,58,237,.25), rgba(236,72,153,.18))",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 30,
  padding: 30,
  boxShadow: "0 20px 80px rgba(0,0,0,.25)",
};

const secondaryCard: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 30,
  padding: 30,
};

const cardHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 26,
  gap: 16,
};

const cardTitle: React.CSSProperties = {
  margin: 0,
  fontSize: 34,
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gap: 18,
};

const infoCard: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 18,
  padding: 18,
};

const infoTitle: React.CSSProperties = {
  margin: 0,
  color: "rgba(255,255,255,.6)",
  fontSize: 14,
};

const infoValue: React.CSSProperties = {
  marginBottom: 0,
  fontSize: 22,
};

const primaryButton: React.CSSProperties = {
  marginTop: 28,
  width: "100%",
  border: "none",
  borderRadius: 18,
  padding: "18px",
  fontSize: 16,
  fontWeight: 900,
  color: "#fff",
  cursor: "pointer",
  background: "linear-gradient(90deg,#7c3aed,#ec4899)",
  boxShadow: "0 15px 40px rgba(124,58,237,.35)",
};

const noticeBox: React.CSSProperties = {
  marginTop: 30,
  padding: 22,
  borderRadius: 22,
  background:
    "linear-gradient(135deg, rgba(124,58,237,.18), rgba(236,72,153,.12))",
  lineHeight: 1.8,
  color: "rgba(255,255,255,.78)",
};

const noticeTitle: React.CSSProperties = {
  display: "block",
  marginBottom: 10,
  fontSize: 18,
  color: "#fff",
};

const bottomGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,
  marginTop: 24,
};

const featureCard: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 24,
  padding: 24,
};