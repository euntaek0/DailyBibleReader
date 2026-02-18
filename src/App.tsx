import { useState } from "react";

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

function App(): React.JSX.Element {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthed = Boolean(accessToken);

  const [currentView, setCurrentView] = useState<AuthedView>("daily");
  const effectiveView = isAuthed ? currentView : "login";

  const handleNavigate = (view: AuthedView): void => {
    setCurrentView(view);
  };

  return (
    <>
      <AppShell>
        <div className="relative flex-1 overflow-hidden">
          {effectiveView === "daily" ? <VerseReader /> : null}
          {effectiveView === "chapter" ? <ChapterReader /> : null}
          {effectiveView === "yearPlan" ? <YearPlanPage /> : null}
          {effectiveView === "settings" ? <SettingsPage /> : null}
          {effectiveView === "login" ? <LoginPage /> : null}
        </div>
        {effectiveView !== "login" ? (
          <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />
        ) : null}
      </AppShell>
      <Toaster />
    </>
  );
}

export default App;
