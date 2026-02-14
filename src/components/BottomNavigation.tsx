import { BookOpen, CalendarDays, Home } from "lucide-react";

import { cn } from "../lib/utils.ts";

interface BottomNavigationProps {
  currentView: "daily" | "chapter" | "yearPlan";
  onNavigate: (view: "daily" | "chapter" | "yearPlan") => void;
}

const navItems = [
  { key: "daily", label: "Daily", icon: Home },
  { key: "yearPlan", label: "Plan", icon: CalendarDays },
  { key: "chapter", label: "Bible", icon: BookOpen },
] as const;

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps): React.JSX.Element {
  return (
    <nav
      aria-label="주요 탐색"
      className="app-bottom-nav absolute inset-x-0 bottom-0 z-40 min-h-[var(--bottom-nav-height)] border-t border-border/75 bg-background/95 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 backdrop-blur-lg"
    >
      <ul className="grid grid-cols-3 gap-2">
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = currentView === key;

          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onNavigate(key)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "tap-target flex w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold tracking-[0.01em] transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.9} />
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
