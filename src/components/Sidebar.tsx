"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Baby, Settings, LogOut } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Maternal Records', href: '/maternal', icon: Users },
  { name: 'Newborn Records', href: '/newborn', icon: Baby },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-sidebar text-white flex-shrink-0 min-h-screen relative">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">ADNU EHR</h1>
        <p className="text-blue-200 text-sm mt-1">Maternity & Birthing Home</p>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-white/20 shadow-lg border border-white/10 text-white' 
                      : 'text-blue-100/80 hover:bg-white/10 hover:text-white border border-transparent'
                    }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-blue-200'} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={async () => {
            await logoutAction();
            window.location.href = '/login';
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-900/40 hover:bg-rose-500/80 text-blue-100 hover:text-white transition-all duration-300 backdrop-blur-md shadow-sm border border-blue-400/20 hover:border-rose-400 border-transparent text-sm font-semibold"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
