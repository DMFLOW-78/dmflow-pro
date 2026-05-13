import Link from "next/link";

export default function EmailConfirmadoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,.25), transparent 28%), #050510",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          textAlign: "center",
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 28,
          padding: 36,
        }}
      >
        <h1 style={{ fontSize: 42, marginTop: 0 }}>
          E-mail confirmado ✅
        </h1>

        <p style={{ color: "rgba(255,255,255,.72)", fontSize: 18 }}>
          Sua conta foi ativada com sucesso. Agora você já pode acessar o 67Flow.
        </p>

        <Link
          href="/login"
          style={{
            display: "inline-block",
            marginTop: 24,
            textDecoration: "none",
            color: "#fff",
            background: "linear-gradient(90deg,#7c3aed,#ec4899)",
            padding: "16px 24px",
            borderRadius: 16,
            fontWeight: 900,
          }}
        >
          Entrar no 67Flow
        </Link>
      </div>
    </main>
  );
}