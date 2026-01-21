
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

import { User, View, Team, Achievement } from "./types";
import Sidebar from "./components/Sidebar";
import AuthView from "./views/AuthView";
import DashboardView from "./views/DashboardView";
import TeamsView from "./views/TeamsView";
import ProposalsView from "./views/ProposalsView";
import AwardsView from "./views/AwardsView";
import SettingsView from "./views/SettingsView";
import ProjectsView from "./views/ProjectsView";
import ChatBot from "./components/ChatBot";

const INITIAL_TEAMS: Team[] = [
  { id: "t1", name: "ESPECTROS NEÓN", members: [], score: 45000, rank: 3, motto: "Sombras en la red." },
  { id: "t2", name: "CORREDORES SYNTH", members: [], score: 32000, rank: 8, motto: "La velocidad es la única verdad." },
  { id: "t3", name: "CAMINANTES DEL VACÍO", members: [], score: 56000, rank: 1, motto: "Abraza el silencio." }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "a1", name: "Primera Sangre", icon: "fa-bolt", description: "Completa tu primera tarea", rarity: "common" },
  { id: "a2", name: "Señor del Cyber", icon: "fa-crown", description: "Alcanza el top 10 del ranking", rarity: "epic" },
  { id: "a3", name: "Samurái del Código", icon: "fa-dragon", description: "Envía 50 propuestas aprobadas", rarity: "legendary" }
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName ?? "Operador",
              email: firebaseUser.email ?? "",
              points: 0,
              rank: 999,
              achievements: [],
              themeColor: "purple",
            });
          }
        } else {
          setUser(null);
          setView("dashboard"); // Reset view when logout
        }
      } catch (e) {
        console.error("Firebase Sync Error:", e);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth);
  };

  const themeColors = {
    purple: "#bc13fe",
    blue: "#00f2ff",
    green: "#39ff14",
  };

  const themeColor = themeColors[user?.themeColor || "purple"];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-base flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#bc13fe]"></div>
        <p className="font-orbitron text-xs text-neon-purple animate-pulse uppercase tracking-[0.3em]">Sincronizando con el Núcleo...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthView />;
  }

  return (
    <div className="flex min-h-screen bg-dark-base text-gray-200">
      <style>{`
        :root {
          --neon-primary: ${themeColor};
          --neon-glow: ${themeColor}44;
        }
        .text-theme { color: var(--neon-primary); }
      `}</style>

      <Sidebar currentView={view} setView={setView} onLogout={handleLogout} />

      <main className="flex-1 lg:ml-64 p-6 overflow-y-auto pb-24 lg:pb-6">
        {view === "dashboard" && <DashboardView user={user} teams={teams} />}
        {view === "teams" && <TeamsView teams={teams} user={user} onUpdateTeam={(id, data) => setTeams(prev => prev.map(t => t.id === id ? {...t, ...data} : t))} />}
        {view === "proposals" && <ProposalsView user={user} />}
        {view === "awards" && <AwardsView user={user} achievements={INITIAL_ACHIEVEMENTS} />}
        {view === "settings" && <SettingsView user={user} onUpdate={(d) => setUser(u => u ? { ...u, ...d } : null)} />}
        {view === "projects" && <ProjectsView user={user} />}
      </main>

      <ChatBot context={{ user, teams }} />
    </div>
  );
};

export default App;
