'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (!error) {
      router.push('/dashboard');
    } else {
      alert(error.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow space-y-4"
      >
        <h1 className="text-3xl font-bold">Entrar</h1>

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
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}