"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      const { data: userData } = await supabase.auth.getUser();

      if (userData.user?.email) {
        setEmail(userData.user.email);
      }

      const { data: workspace } = await supabase
        .from("workspaces")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (workspace) {
        setName(workspace.name || "Marcelo Rebola");
        setInstagram(workspace.instagram_username || "@adsmarcelosilva");
      }
    }

    loadData();
  }, [supabase]);

  async function saveProfile() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("workspaces")
      .update({
        name,
        instagram_username: instagram,
      })
      .limit(1);

    if (error) {
      setMessage("Erro ao salvar alterações.");
    } else {
      setMessage("Alterações salvas com sucesso.");
    }

    setLoading(false);
  }

  async function sendPasswordReset() {
    if (!email) {
      setMessage("E-mail não encontrado.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setMessage(
      error
        ? "Erro ao enviar recuperação de senha."
        : "Link de recuperação enviado para seu e-mail."
    );
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={eyebrow}>67FLOW SETTINGS</p>
        <h1 style={title}>Configurações</h1>
        <p style={subtitle}>
          Gerencie sua conta, integração com Instagram e segurança.
        </p>

        {message && <div style={alertBox}>{message}</div>}

        <div style={grid}>
          <div style={card}>
            <h2 style={cardTitle}>Perfil</h2>

            <Input label="Nome" value={name} onChange={setName} />
            <Input label="E-mail" value={email} onChange={setEmail} disabled />
            <Input label="Instagram" value={instagram} onChange={setInstagram} />

            <button onClick={saveProfile} disabled={loading} style={primaryButton}>
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>

          <div style={card}>
            <h2 style={cardTitle}>Plano atual</h2>

            <div style={planBox}>
              <p style={planLabel}>PLANO FREE</p>
              <h3 style={{ fontSize: 42, margin: "10px 0" }}>Gratuito</h3>
              <p style={muted}>Ideal para testes e primeiros leads.</p>
            </div>

            <button
              style={upgradeButton}
              onClick={() => alert("Checkout Mercado Pago será conectado no próximo passo.")}
            >
              Fazer upgrade
            </button>
          </div>
        </div>

        <div style={{ ...card, marginTop: 24 }}>
          <h2 style={cardTitle}>Segurança</h2>

          <div style={securityGrid}>
            <ActionCard
              title="Senha"
              text="Receba um link para alterar sua senha."
              button="Alterar senha"
              onClick={sendPasswordReset}
            />

            <ActionCard
              title="E-mail"
              text="Verificação de e-mail será obrigatória no cadastro."
              button="Ver status"
              onClick={() => setMessage("Verificação de e-mail adicionada à lista do projeto.")}
            />

            <ActionCard
              title="Sair"
              text="Encerrar sua sessão neste dispositivo."
              button="Sair da conta"
              onClick={logout}
              danger
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
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{ marginBottom: 10, color: "rgba(255,255,255,.7)", fontWeight: 700 }}>
        {label}
      </p>

      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,.08)",
          background: disabled ? "rgba(255,255,255,.025)" : "rgba(255,255,255,.05)",
          color: "#fff",
          fontSize: 16,
          outline: "none",
        }}
      />
    </div>
  );
}

function ActionCard({
  title,
  text,
  button,
  onClick,
  danger = false,
}: {
  title: string;
  text: string;
  button: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <div style={miniCard}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={muted}>{text}</p>
      <button onClick={onClick} style={danger ? dangerButton : primaryButton}>
        {button}
      </button>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,.22), transparent 28%), #050510",
  color: "#fff",
  padding: "40px 28px",
};

const eyebrow = { color: "#e879f9", fontWeight: 900, letterSpacing: ".08em" };
const title = { margin: 0, fontSize: 52 };
const subtitle = { color: "rgba(255,255,255,.7)", fontSize: 18, lineHeight: 1.7 };
const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 };

const card: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 30,
  padding: 30,
};

const cardTitle = { marginTop: 0, fontSize: 34 };

const planBox: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(124,58,237,.22), rgba(236,72,153,.18))",
  borderRadius: 24,
  padding: 24,
  marginBottom: 24,
};

const planLabel = { margin: 0, color: "#f0abfc", fontWeight: 900 };
const muted = { color: "rgba(255,255,255,.7)", lineHeight: 1.7 };

const primaryButton: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 18,
  padding: "18px",
  fontWeight: 900,
  color: "#fff",
  cursor: "pointer",
  background: "linear-gradient(90deg,#7c3aed,#ec4899)",
};

const upgradeButton: React.CSSProperties = {
  ...primaryButton,
  background: "linear-gradient(90deg,#f59e0b,#ef4444)",
};

const dangerButton: React.CSSProperties = {
  ...primaryButton,
  background: "rgba(239,68,68,.22)",
  border: "1px solid rgba(239,68,68,.3)",
};

const securityGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 18,
};

const miniCard: React.CSSProperties = {
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 24,
  padding: 24,
};

const alertBox: React.CSSProperties = {
  background: "rgba(34,197,94,.14)",
  color: "#4ade80",
  border: "1px solid rgba(34,197,94,.22)",
  padding: 18,
  borderRadius: 18,
  marginBottom: 24,
  fontWeight: 800,
};