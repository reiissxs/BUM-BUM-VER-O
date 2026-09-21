"use client";

import Link from "next/link";
import { Dumbbell, Home, Library, MessageCircle, TrendingUp } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/inicio", label: "Início", icon: Home },
  { href: "/treinos", label: "Treinos", icon: Dumbbell },
  { href: "/exercicios", label: "Exercícios", icon: Library },
  { href: "/progresso", label: "Progresso", icon: TrendingUp },
  { href: "/suporte", label: "Suporte", icon: MessageCircle },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} className={`nav-item ${active ? "active" : ""}`} href={item.href}>
            <Icon aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
