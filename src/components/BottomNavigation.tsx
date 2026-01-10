import React from "react";

interface BottomNavigationProps {
  currentView: "daily" | "chapter" | "yearPlan";
  onNavigate: (view: "daily" | "chapter" | "yearPlan") => void;
}

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "80px",
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: "20px", // Safe area for iOS home indicator
        zIndex: 100,
      }}
    >
      <button
        onClick={() => onNavigate("daily")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          opacity: currentView === "daily" ? 1 : 0.5,
          transition: "opacity 0.3s",
          padding: "10px",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span style={{ fontSize: "12px", fontWeight: 500 }}>Daily</span>
      </button>

      <button
        onClick={() => onNavigate("yearPlan")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          opacity: currentView === "yearPlan" ? 1 : 0.5,
          transition: "opacity 0.3s",
          padding: "10px",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span style={{ fontSize: "12px", fontWeight: 500 }}>Plan</span>
      </button>

      <button
        onClick={() => onNavigate("chapter")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          opacity: currentView === "chapter" ? 1 : 0.5,
          transition: "opacity 0.3s",
          padding: "10px",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <span style={{ fontSize: "12px", fontWeight: 500 }}>Bible</span>
      </button>
    </nav>
  );
}
