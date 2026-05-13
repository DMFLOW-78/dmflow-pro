"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const supabase = createSupabaseClient();

  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErro("");
    setSucesso("");

    if (!isValidEmail(email)) {
      setErro("Digite um e-mail válido.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          name,
          instagram,
        },
      },
    });

    if (error) {
      setErro(error.message);
      setLoading(false);
      return;
    }

    setSucesso(
      "Conta criada! Enviamos um link de confirmação para seu e-mail."
    );

    setName("");
    setInstagram("");
    setEmail("");
    setPassword("");
    setLoading(false);
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Image
            src="/logo-67flow.png"
            alt="67Flow"
            width={90}
            height={90}
            style={{ objectFit: "contain", margin: "0 auto" }}
          />

          <h1 style={{ marginTop: "12px", fontSize: "30px" }}>
            Criar conta
          </h1>

          <p style={{ opacity: 0.75, marginTop: "8px" }}>
            Comece a automatizar seu Instagram
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Seu Instagram (@usuario)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {erro ? <p style={errorStyle}>{erro}</p> : null}
          {sucesso ? <p style={successStyle}>{sucesso}</p> : null}

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "18px", opacity: 0.85 }}>
          Já tem conta?{" "}
          <Link href="/login" style={{ color: "#ff4fd8", fontWeight: 800 }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,.25), transparent 28%), #050510",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  color: "#fff",
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "460px",
  background: "rgba(255,255,255,.055)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "24px",
  padding: "30px",
  boxShadow: "0 20px 80px rgba(0,0,0,.35)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px 16px",
  marginBottom: "13px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,.10)",
  background: "rgba(255,255,255,.04)",
  color: "#fff",
  outline: "none",
  fontSize: "15px",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(90deg, #7b2ff7, #f107a3)",
  color: "#fff",
  fontWeight: 900,
  cursor: "pointer",
  fontSize: "16px",
};

const errorStyle: React.CSSProperties = {
  color: "#ff7d7d",
  marginBottom: "12px",
};

const successStyle: React.CSSProperties = {
  color: "#4ade80",
  marginBottom: "12px",
  lineHeight: 1.5,
};