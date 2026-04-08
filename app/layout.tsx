import "./globals.css";
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
  <body className="flex flex-col min-h-screen">
    
    <main className="flex-1">
      {children}
    </main>

    <footer className="text-center text-xs text-gray-400 py-3">
  Criado por <span className="font-semibold">Marcelo Rebola</span>
</footer>

  </body>
</html>
  );
}