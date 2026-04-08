import AppSidebar from "@/components/AppSidebar";

export default function IntegrationsPage() {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-3xl font-bold">Integrações</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white p-6 shadow space-y-4">
            <h2 className="text-xl font-semibold">Instagram</h2>
            <p className="text-slate-600">Conecte uma conta profissional via Meta Graph API.</p>
            <button className="rounded-2xl bg-black text-white px-6 py-3">Conectar Instagram</button>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow space-y-4">
            <h2 className="text-xl font-semibold">Facebook</h2>
            <p className="text-slate-600">Conecte uma página para automação de comentários e inbox.</p>
            <button className="rounded-2xl bg-black text-white px-6 py-3">Conectar Facebook</button>
          </div>
        </div>
      </main>
    </div>
  );
}