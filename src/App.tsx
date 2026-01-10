import { useState } from "react";
import { Layout } from "./components/Layout";
import { VerseReader } from "./pages/VerseReader";
import { ChapterReader } from "./pages/ChapterReader";
import { BottomNavigation } from "./components/BottomNavigation";
import "./index.css";

function App() {
  const [currentView, setCurrentView] = useState<"daily" | "chapter">("daily");

  return (
    <Layout>
      <div style={{ height: "100%", paddingBottom: "80px", overflowY: "auto" }}>
        {currentView === "daily" ? <VerseReader /> : <ChapterReader />}
      </div>
      <BottomNavigation currentView={currentView} onNavigate={setCurrentView} />
    </Layout>
  );
}

export default App;
