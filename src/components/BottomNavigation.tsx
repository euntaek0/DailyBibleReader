import { BookOpen, CalendarDays, Home, Settings } from "lucide-react";

import { cn } from "../lib/utils.ts";

interface BottomNavigationProps {
  currentView: "daily" | "chapter" | "yearPlan" | "settings";
  onNavigate: (view: "daily" | "chapter" | "yearPlan" | "settings") => void;
}

const navItems = [
  { key: "daily", label: "오늘", icon: Home },
  { key: "yearPlan", label: "연간", icon: CalendarDays },
  { key: "chapter", label: "장읽기", icon: BookOpen },
  { key: "settings", label: "설정", icon: Settings },
] as const;

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps): React.JSX.Element {
  return (
    <nav
      aria-label="주요 탐색"
      className="app-bottom-nav absolute inset-x-0 bottom-0 z-40 min-h-[var(--bottom-nav-height)] px-2 pb-[calc(env(safe-area-inset-bottom)+0.35rem)] pt-1"
    >
      <ul className="grid grid-cols-4 gap-1">
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = currentView === key;

          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onNavigate(key)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "tap-target flex w-full flex-col items-center justify-center gap-[3px] px-1 py-1 text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={2.1} />
                <span>{label}</span>
                <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-primary" : "bg-transparent")} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
