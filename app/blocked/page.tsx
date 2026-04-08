export default function BlockedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow text-center space-y-5">
        <h1 className="text-4xl font-bold text-red-600">
          Acesso bloqueado
        </h1>

        <p className="text-lg text-slate-700">
          Seu acesso está bloqueado no momento.
        </p>

        <p className="text-slate-600">
          Entre em contato com o financeiro para regularizar sua assinatura e liberar o uso do sistema.
        </p>

        <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
          Se você já realizou o pagamento, aguarde a liberação ou fale com o suporte financeiro.
        </div>

        <a
  href="https://wa.me/5513991140606?text=Olá,%20quero%20regularizar%20meu%20acesso%20ao%20DMFlow"
  target="_blank"
  className="rounded-2xl bg-black px-6 py-3 text-white inline-block"
>
  Regularizar acesso via WhatsApp
</a>
      </div>
    </main>
  );
}