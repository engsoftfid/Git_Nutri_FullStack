import React, { useState, useEffect } from "react";
import DietView from "./components/DietView";
import DiaryView from "./components/DiaryView";
import FoodAnalyzer from "./components/FoodAnalyzer";
import UserProfileForm from "./components/UserProfileForm";
import "./styles/global.css";

export default function App() {
  const [view, setView] = useState<"diet" | "diary" | "analyze" | "profile">("diet");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mostra o loading por 300ms só para UX bonito
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
        Carregando...
      </div>
    );
  }

  return (
    <div>
      {view === "diet" && <DietView />}
      {view === "diary" && <DiaryView />}
      {view === "analyze" && <FoodAnalyzer />}
      {view === "profile" && <UserProfileForm />}

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#22cc66",
          padding: "10px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button onClick={() => setView("diet")}>Dieta</button>
        <button onClick={() => setView("diary")}>Diário</button>
        <button onClick={() => setView("analyze")}>Analisar</button>
        <button onClick={() => setView("profile")}>Perfil</button>
      </nav>
    </div>
  );
}
