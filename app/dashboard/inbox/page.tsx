'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function InboxPage() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      setMessages(data || []);
    }

    load();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-slate-50">
      <h1 className="text-3xl font-bold mb-6">Inbox</h1>

      <div className="bg-white p-6 rounded-3xl shadow space-y-3 max-w-xl">
        {messages.length === 0 && (
          <p className="text-gray-500">Nenhuma mensagem ainda</p>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="border p-3 rounded-xl">
            <p className="text-sm text-gray-400">{msg.direction}</p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}