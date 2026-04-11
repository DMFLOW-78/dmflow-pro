import "./globals.css";
import React from "react";

export const metadata = {
  title: "67Flow",
  description: "Automação no nível sixseven.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <footer className="text-center text-xs text-gray-400 py-3">
          Criado por Marcelo Rebola
        </footer>
      </body>
    </html>
  );
}