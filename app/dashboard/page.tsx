'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkUserAccess } from '@/lib/authGuard';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const result = await checkUserAccess();

      if (!result.ok) {
        router.push(result.redirect);
      }
    }

    init();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        Dashboard 🚀
      </h1>
    </div>
  );
}