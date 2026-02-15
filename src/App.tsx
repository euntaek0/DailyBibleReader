import { useEffect, useMemo, useState } from "react";

import { AppShell } from "./components/system/AppShell.tsx";
import { VerseReader } from "./pages/VerseReader.tsx";
import { ChapterReader } from "./pages/ChapterReader.tsx";
import { YearPlanPage } from "./pages/YearPlanPage.tsx";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { BottomNavigation } from "./components/BottomNavigation.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { useAuthStore } from "./stores/authStore.ts";

type AuthedView = "daily" | "chapter" | "yearPlan" | "settings";
type AppView = AuthedView | "login";

function App(): React.JSX.Element {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthed = Boolean(accessToken);

  const [currentView, setCurrentView] = useState<AppView>("login");

  const authedFallbackView: AuthedView = useMemo(() => "daily", []);

  useEffect(() => {
    if (!isAuthed && currentView !== "login") {
      setCurrentView("login");
      return;
    }

    if (isAuthed && currentView === "login") {
      setCurrentView(authedFallbackView);
    }
  }, [authedFallbackView, currentView, isAuthed]);

  const handleNavigate = (view: AuthedView): void => {
    if (!isAuthed) {
      setCurrentView("login");
      return;
    }

    setCurrentView(view);
  };

  return (
    <>
      <AppShell>
        <div className="relative flex-1 overflow-hidden">
          {currentView === "daily" ? <VerseReader /> : null}
          {currentView === "chapter" ? <ChapterReader /> : null}
          {currentView === "yearPlan" ? <YearPlanPage /> : null}
          {currentView === "settings" ? <SettingsPage /> : null}
          {currentView === "login" ? <LoginPage /> : null}
        </div>
        {currentView !== "login" ? (
          <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />
        ) : null}
      </AppShell>
      <Toaster />
    </>
  );
}

export default App;
