"use client";

export default function SettingsPage() {
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
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 36 }}>
          <p
            style={{
              color: "#e879f9",
              fontWeight: 900,
              letterSpacing: ".08em",
              marginBottom: 10,
            }}
          >
            67FLOW SETTINGS
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: 52,
            }}
          >
            Configurações
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,.7)",
              fontSize: 18,
              lineHeight: 1.7,
              marginTop: 14,
              maxWidth: 760,
            }}
          >
            Gerencie sua conta, integração com Instagram e segurança do seu
            workspace.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {/* PERFIL */}
          <div style={cardStyle}>
            <h2 style={titleStyle}>Perfil</h2>

            <div style={{ display: "grid", gap: 18 }}>
              <Input
                label="Nome"
                value="Marcelo Rebola"
              />

              <Input
                label="E-mail"
                value="marcelo@email.com"
              />

              <Input
                label="Instagram"
                value="@adsmarcelosilva"
              />
            </div>

            <button style={primaryButton}>
              Salvar alterações
            </button>
          </div>

          {/* PLANO */}
          <div style={cardStyle}>
            <h2 style={titleStyle}>Plano atual</h2>

            <div style={planBox}>
              <p
                style={{
                  margin: 0,
                  color: "#f0abfc",
                  fontWeight: 800,
                  letterSpacing: ".05em",
                }}
              >
                PLANO FREE
              </p>

              <h3
                style={{
                  marginBottom: 0,
                  fontSize: 42,
                }}
              >
                Gratuito
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,.7)",
                  lineHeight: 1.7,
                }}
              >
                Ideal para testes e primeiros leads.
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <PlanItem text="Comentários automáticos" />
              <PlanItem text="Captura de leads" />
              <PlanItem text="CRM básico" />
              <PlanItem text="Integração Instagram" />
            </div>

            <button style={upgradeButton}>
              Fazer upgrade
            </button>
          </div>
        </div>

        {/* SEGURANÇA */}
        <div
          style={{
            marginTop: 24,
            ...cardStyle,
          }}
        >
          <h2 style={titleStyle}>Segurança</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 18,
              marginTop: 24,
            }}
          >
            <SecurityCard
              title="Senha"
              text="Atualize sua senha regularmente."
              button="Alterar senha"
            />

            <SecurityCard
              title="E-mail verificado"
              text="Seu e-mail está protegido e validado."
              button="Verificado"
            />

            <SecurityCard
              title="Sessões"
              text="Gerencie dispositivos conectados."
              button="Encerrar sessões"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        style={{
          marginBottom: 10,
          color: "rgba(255,255,255,.7)",
          fontWeight: 700,
        }}
      >
        {label}
      </p>

      <input
        defaultValue={value}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,.08)",
          background: "rgba(255,255,255,.05)",
          color: "#fff",
          fontSize: 16,
          outline: "none",
        }}
      />
    </div>
  );
}

function PlanItem({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 18,
        padding: 18,
        color: "rgba(255,255,255,.85)",
      }}
    >
      ✓ {text}
    </div>
  );
}

function SecurityCard({
  title,
  text,
  button,
}: {
  title: string;
  text: string;
  button: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 24,
        padding: 24,
      }}
    >
      <h3
        style={{
          marginTop: 0,
          fontSize: 24,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "rgba(255,255,255,.7)",
          lineHeight: 1.7,
          minHeight: 60,
        }}
      >
        {text}
      </p>

      <button
        style={{
          width: "100%",
          border: "none",
          borderRadius: 16,
          padding: "16px",
          fontWeight: 800,
          fontSize: 15,
          cursor: "pointer",
          color: "#fff",
          background:
            "linear-gradient(90deg,#7c3aed,#ec4899)",
        }}
      >
        {button}
      </button>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 30,
  padding: 30,
  boxShadow: "0 20px 80px rgba(0,0,0,.25)",
};

const titleStyle: React.CSSProperties = {
  marginTop: 0,
  fontSize: 34,
};

const primaryButton: React.CSSProperties = {
  marginTop: 24,
  width: "100%",
  border: "none",
  borderRadius: 18,
  padding: "18px",
  fontSize: 16,
  fontWeight: 900,
  color: "#fff",
  cursor: "pointer",
  background:
    "linear-gradient(90deg,#7c3aed,#ec4899)",
};

const upgradeButton: React.CSSProperties = {
  marginTop: 24,
  width: "100%",
  border: "none",
  borderRadius: 18,
  padding: "18px",
  fontSize: 16,
  fontWeight: 900,
  color: "#fff",
  cursor: "pointer",
  background:
    "linear-gradient(90deg,#f59e0b,#ef4444)",
};

const planBox: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(124,58,237,.22), rgba(236,72,153,.18))",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 24,
  padding: 24,
  marginBottom: 24,
};