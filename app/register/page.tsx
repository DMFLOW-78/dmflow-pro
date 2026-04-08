'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    if (data.user) {
      await supabase.from('workspaces').insert({
        user_id: data.user.id,
        company_name: company,
      });
    }

    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow space-y-4"
      >
        <h1 className="text-3xl font-bold">Criar conta</h1>

        <input
          className="w-full rounded-2xl border p-3"
          placeholder="Empresa"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="w-full rounded-2xl border p-3"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded-2xl border p-3"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-2xl bg-black text-white p-3">
          Criar conta
        </button>
      </form>
    </main>
  );
}