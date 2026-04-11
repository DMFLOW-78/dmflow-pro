"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErro(error.message);
      setLoading(false);
      return;
    }

    setSucesso("Conta criada com sucesso.");
    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b12",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#151522",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Image
            src="/logo-67flow.png"
            alt="67Flow"
            width={90}
            height={90}
            style={{ objectFit: "contain", margin: "0 auto" }}
          />
          <h1 style={{ marginTop: "12px", fontSize: "28px" }}>Criar conta</h1>
          <p style={{ opacity: 0.75, marginTop: "8px" }}>
            Cadastre-se para começar
          </p>
        </div>

        <form onSubmit={handleRegister}>
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

          {erro ? (
            <p style={{ color: "#ff6b6b", marginBottom: "12px" }}>{erro}</p>
          ) : null}

          {sucesso ? (
            <p style={{ color: "#6bff95", marginBottom: "12px" }}>{sucesso}</p>
          ) : null}

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "18px", opacity: 0.85 }}>
          Já tem conta?{" "}
          <Link href="/login" style={{ color: "#ff4fd8" }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "#0f0f18",
  color: "#fff",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(90deg, #7b2ff7, #f107a3)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};