"use client";
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith('/login') || pathname?.startsWith('/signup');
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {!hideHeader && <Header />}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
