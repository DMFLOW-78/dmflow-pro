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
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <p
            style={{
              color: "#e879f9",
              fontWeight: 800,
              letterSpacing: ".08em",
              marginBottom: 10,
            }}
          >
            67FLOW INTEGRATIONS
          </p>

          <h1
            style={{
              fontSize: 54,
              margin: 0,
            }}
          >
            Integrações
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,.7)",
              fontSize: 18,
              marginTop: 14,
              maxWidth: 700,
              lineHeight: 1.7,
            }}
          >
            Conecte Instagram, Facebook e ferramentas externas
            para automatizar mensagens e capturar leads.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {/* INSTAGRAM */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,.25), rgba(236,72,153,.18))",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 30,
              padding: 30,
              boxShadow: "0 20px 80px rgba(0,0,0,.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 26,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 34,
                }}
              >
                Instagram
              </h2>

              <div
                style={{
                  background: "rgba(34,197,94,.16)",
                  color: "#4ade80",
                  padding: "10px 16px",
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                CONECTADO
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: 18,
              }}
            >
              <InfoCard
                title="Conta conectada"
                value="@adsmarcelosilva"
              />

              <InfoCard
                title="Webhook"
                value="Ativo"
              />

              <InfoCard
                title="Comentários automáticos"
                value="Funcionando"
              />

              <InfoCard
                title="Direct Message"
                value="Necessita permissão"
              />
            </div>

            <button
              style={{
                marginTop: 28,
                width: "100%",
                border: "none",
                borderRadius: 18,
                padding: "18px",
                fontSize: 16,
                fontWeight: 800,
                color: "#fff",
                cursor: "pointer",
                background:
                  "linear-gradient(90deg,#7c3aed,#ec4899)",
                boxShadow:
                  "0 15px 40px rgba(124,58,237,.35)",
              }}
            >
              Reconectar Instagram
            </button>
          </div>

          {/* META */}
          <div
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 30,
              padding: 30,
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 34,
              }}
            >
              Meta App
            </h2>

            <div
              style={{
                marginTop: 30,
                display: "grid",
                gap: 18,
              }}
            >
              <InfoCard
                title="App Status"
                value="Development"
              />

              <InfoCard
                title="Webhook"
                value="Configurado"
              />

              <InfoCard
                title="Token"
                value="Ativo"
              />

              <InfoCard
                title="API Version"
                value="v25.0"
              />
            </div>

            <div
              style={{
                marginTop: 30,
                padding: 20,
                borderRadius: 20,
                background: "rgba(255,255,255,.04)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,.75)",
              }}
            >
              O sistema está conectado ao Instagram e pronto
              para automações de comentários e captura de leads.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 18,
        padding: 18,
      }}
    >
      <p
        style={{
          margin: 0,
          color: "rgba(255,255,255,.6)",
          fontSize: 14,
        }}
      >
        {title}
      </p>

      <h3
        style={{
          marginBottom: 0,
          fontSize: 22,
        }}
      >
        {value}
      </h3>
    </div>
  );
}