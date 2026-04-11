'use client';


import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      setLeads(data || []);
    }
    load();
  }, []);

  return (
    <div className="flex">
        <main className="flex-1 p-8 space-y-6">
        <h1 className="text-3xl font-bold">Leads</h1>
        <div className="rounded-3xl bg-white p-6 shadow space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-2xl border p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{lead.name || 'Sem nome'}</p>
                <p className="text-sm text-slate-500">{lead.username || lead.platform_user_id}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">{lead.status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}