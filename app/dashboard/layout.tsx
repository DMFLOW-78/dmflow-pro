import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#050510" }}>
      <aside
        style={{
          width: 260,
          padding: 24,
          borderRight: "1px solid rgba(255,255,255,.08)",
          background: "rgba(255,255,255,.035)",
          color: "#fff",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h2 style={{ margin: 0, color: "#e879f9" }}>67Flow</h2>
        <p style={{ color: "rgba(255,255,255,.55)", marginBottom: 30 }}>
          Automação Instagram
        </p>

        <nav style={{ display: "grid", gap: 12 }}>
          <MenuItem href="/dashboard" text="Painel" />
          <MenuItem href="/dashboard/leads" text="Leads" />
          <MenuItem href="/dashboard/flows" text="Fluxos" />
          <MenuItem href="/dashboard/integrations" text="Integrações" />
          <MenuItem href="/dashboard/settings" text="Configurações" />
        </nav>

        <div style={{ marginTop: 40 }}>
  <Link href="/logout" style={logoutStyle}>
    Sair
  </Link>
</div>
      </aside>

      <section style={{ flex: 1 }}>{children}</section>
    </div>
  );
}

function MenuItem({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "#fff",
        padding: "14px 16px",
        borderRadius: 16,
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.08)",
        fontWeight: 800,
      }}
    >
      {text}
    </Link>
  );
}

const logoutStyle: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  color: "#ff7d7d",
  padding: "14px 16px",
  borderRadius: 16,
  background: "rgba(239,68,68,.12)",
  border: "1px solid rgba(239,68,68,.22)",
  fontWeight: 800,
};