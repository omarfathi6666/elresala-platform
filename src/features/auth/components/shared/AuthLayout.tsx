import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  side: ReactNode;
}

export default function AuthLayout({
  children,
  side,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </section>

        <aside className="hidden lg:block">
          {side}
        </aside>
      </div>
    </main>
  );
}
