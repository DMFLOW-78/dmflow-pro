'use client';

import Link from 'next/link';

export function AppSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r p-6 space-y-3">
      <h2 className="text-2xl font-bold">DMFlow Pro</h2>
      <nav className="space-y-2 text-sm">
        <Link className="block rounded-xl p-3 hover:bg-slate-100" href="/dashboard">Dashboard</Link>
        <Link className="block rounded-xl p-3 hover:bg-slate-100" href="/dashboard/flows">Fluxos</Link>
        <Link className="block rounded-xl p-3 hover:bg-slate-100" href="/dashboard/leads">Leads</Link>
        <Link className="block rounded-xl p-3 hover:bg-slate-100" href="/dashboard/inbox">Inbox</Link>
        <Link className="block rounded-xl p-3 hover:bg-slate-100" href="/dashboard/integrations">Integrações</Link>
      </nav>
    </aside>
  );
}