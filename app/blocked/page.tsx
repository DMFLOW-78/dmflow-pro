export default function BlockedPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,.25), transparent 28%), #050510",
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
          maxWidth: "620px",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "32px",
          padding: "42px",
          textAlign: "center",
          boxShadow: "0 25px 80px rgba(0,0,0,.35)",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 24px",
            borderRadius: "999px",
            background:
              "linear-gradient(135deg, rgba(239,68,68,.2), rgba(236,72,153,.18))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "42px",
          }}
        >
          🔒
        </div>

        <h1
          style={{
            fontSize: "46px",
            marginTop: 0,
            marginBottom: "18px",
          }}
        >
          Acesso bloqueado
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,.78)",
            fontSize: "20px",
            lineHeight: 1.7,
            marginBottom: "14px",
          }}
        >
          Seu plano está suspenso no momento.
        </p>

        <p
          style={{
            color: "rgba(255,255,255,.62)",
            lineHeight: 1.8,
            fontSize: "17px",
          }}
        >
          Entre em contato com o financeiro para regularizar sua assinatura e
          liberar novamente o acesso ao 67Flow.
        </p>

        <div
          style={{
            marginTop: "28px",
            padding: "18px",
            borderRadius: "20px",
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.06)",
            color: "rgba(255,255,255,.72)",
            lineHeight: 1.7,
          }}
        >
          Se você já realizou o pagamento, aguarde a liberação automática ou
          fale com o suporte financeiro.
        </div>

        <a
          href="https://wa.me/5513991140606?text=Olá,%20quero%20regularizar%20meu%20acesso%20ao%2067Flow"
          target="_blank"
          style={{
            display: "inline-block",
            marginTop: "28px",
            textDecoration: "none",
            color: "#fff",
            background: "linear-gradient(90deg,#7c3aed,#ec4899)",
            padding: "18px 28px",
            borderRadius: "18px",
            fontWeight: 900,
            fontSize: "16px",
            boxShadow: "0 10px 40px rgba(124,58,237,.4)",
          }}
        >
          Regularizar via WhatsApp
        </a>
      </div>
    </main>
  );
}