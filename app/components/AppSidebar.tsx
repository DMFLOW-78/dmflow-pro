"use client";

export default function AppSidebar() {
  return (
    <aside style={{
      width: "200px",
      height: "100vh",
      background: "#111",
      color: "#fff",
      padding: "20px"
    }}>
      <h2>DMFlow</h2>

      <nav style={{ marginTop: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Dashboard</li>
          <li>Fluxos</li>
          <li>Integrações</li>
          <li>Configurações</li>
        </ul>
      </nav>
    </aside>
  );
}