import { BookOpen, CalendarDays, Home, LogIn, Settings } from "lucide-react";

import { cn } from "../lib/utils.ts";

interface BottomNavigationProps {
  currentView: "daily" | "chapter" | "yearPlan" | "settings" | "login";
  onNavigate: (view: "daily" | "chapter" | "yearPlan" | "settings" | "login") => void;
}

const navItems = [
  { key: "daily", label: "오늘", icon: Home },
  { key: "yearPlan", label: "연간", icon: CalendarDays },
  { key: "chapter", label: "장읽기", icon: BookOpen },
  { key: "settings", label: "설정", icon: Settings },
  { key: "login", label: "로그인", icon: LogIn },
] as const;

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps): React.JSX.Element {
  return (
    <nav
      aria-label="주요 탐색"
      className="app-bottom-nav absolute inset-x-0 bottom-0 z-40 min-h-[var(--bottom-nav-height)] border-t border-border/80 bg-card/95 px-2 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2 backdrop-blur"
    >
      <ul className="grid grid-cols-5 gap-1.5">
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = currentView === key;

          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onNavigate(key)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "tap-target flex w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] font-semibold tracking-[-0.01em] transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2.0} />
                <span>{label}</span>
                <span className={cn("h-1 w-1 rounded-full", active ? "bg-primary" : "bg-transparent")} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
