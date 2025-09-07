"use client";
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith('/login') || pathname?.startsWith('/signup');
  return (
    <div className="flex min-h-screen flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
