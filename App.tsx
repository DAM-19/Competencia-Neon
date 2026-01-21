
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
    // Escuchar cambios de autenticación
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setLoading(true);
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser(userData);
          } else {
            // Fallback robusto si el documento no existe aún
            const fallbackUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName ?? "Operador",
              email: firebaseUser.email ?? "",
              points: 0,
              rank: 999,
              achievements: [],
              themeColor: "purple",
            };
            setUser(fallbackUser);
          }
          setView("dashboard");
        } catch (error) {
          console.error("Error crítico de sincronización:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setView("auth");
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth);
  };

  const updateTeam = (teamId: string, newData: Partial<Team>) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, ...newData } : t))
    );
  };

  const getViewTitle = (v: View) => {
    switch (v) {
      case "dashboard": return "Zona de Combate";
      case "teams": return "Facciones";
      case "proposals": return "Planos Maestros";
      case "awards": return "Salón de la Fama";
      case "settings": return "Núcleo de Configuración";
      case "projects": return "Archivos de Misión";
      default: return "";
    }
  };

  const themeColors = {
    purple: "#bc13fe",
    blue: "#00f2ff",
    green: "#39ff14",
  };

  const themeColor = themeColors[user?.themeColor || "purple"];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-base flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-neon-purple/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-neon-purple border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#bc13fe]"></div>
          </div>
          <div className="text-center">
            <p className="font-orbitron text-[10px] text-neon-purple animate-pulse uppercase tracking-[0.5em] mb-2">Sincronizando</p>
            <p className="font-rajdhani text-xs text-gray-500 uppercase tracking-widest">Protocolo NEON-CORE v1.0.4</p>
          </div>
        </div>
      </div>
    );
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

      <main className="flex-1 lg:ml-64 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-orbitron text-theme uppercase tracking-widest neon-text-glow">
              {getViewTitle(view)}
            </h1>
            <p className="text-gray-400 font-rajdhani">
              Enlace activo: <span className="text-theme font-bold">{user?.name}</span>
            </p>
          </div>

          <img
            src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.name}`}
            className="w-12 h-12 rounded-full border-2 border-theme shadow-lg shadow-theme/20"
            alt="User Avatar"
          />
        </header>

        <div className="animate-fade-in">
          {view === "dashboard" && user && <DashboardView user={user} teams={teams} />}
          {view === "teams" && user && <TeamsView teams={teams} user={user} onUpdateTeam={updateTeam} />}
          {view === "proposals" && user && <ProposalsView user={user} />}
          {view === "awards" && user && <AwardsView user={user} achievements={INITIAL_ACHIEVEMENTS} />}
          {view === "settings" && user && <SettingsView user={user} onUpdate={(data) => setUser(prev => prev ? {...prev, ...data} : null)} />}
          {view === "projects" && user && <ProjectsView user={user} />}
        </div>
      </main>

      <ChatBot context={{ user, teams }} />
    </div>
  );
};

export default App;
