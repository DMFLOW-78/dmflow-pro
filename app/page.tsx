import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold">DMFlow Pro</h1>
        <p className="text-lg text-slate-600">Automatize Instagram Direct e capture clientes no piloto automático.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="rounded-2xl bg-black text-white px-6 py-3">Entrar</Link>
          <Link href="/register" className="rounded-2xl border px-6 py-3">Criar conta</Link>
        </div>
      </div>
    </main>
  );
}