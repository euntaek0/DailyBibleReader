import { useState } from "react";

import { AppShell } from "./components/system/AppShell.tsx";
import { VerseReader } from "./pages/VerseReader.tsx";
import { ChapterReader } from "./pages/ChapterReader.tsx";
import { YearPlanPage } from "./pages/YearPlanPage.tsx";
import { BottomNavigation } from "./components/BottomNavigation.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

type AppView = "daily" | "chapter" | "yearPlan";

function App(): React.JSX.Element {
  const [currentView, setCurrentView] = useState<AppView>("daily");

  return (
    <>
      <AppShell>
        <div className="relative flex-1 overflow-hidden">
          {currentView === "daily" ? <VerseReader /> : null}
          {currentView === "chapter" ? <ChapterReader /> : null}
          {currentView === "yearPlan" ? <YearPlanPage /> : null}
        </div>
        <BottomNavigation currentView={currentView} onNavigate={setCurrentView} />
      </AppShell>
      <Toaster />
    </>
  );
}

export default App;
