
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
      if (firebaseUser) {
        try {
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
          setView("dashboard");
        } catch (e) {
          console.error(e);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const updateTeam = (teamId: string, newData: Partial<Team>) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, ...newData } : t));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-base flex items-center justify-center text-white">
        Cargando…
      </div>
    );
  }

  // 🔥 AQUÍ ESTABA EL ERROR: ahora sí se renderiza AuthView
  if (!user) {
    return <AuthView />;
  }

  return (
    <div className="flex min-h-screen bg-dark-base text-gray-200">
      <Sidebar currentView={view} setView={setView} onLogout={handleLogout} />

      <main className="flex-1 lg:ml-64 p-6 overflow-y-auto">
        {view === "dashboard" && <DashboardView user={user} teams={teams} />}
        {view === "teams" && <TeamsView teams={teams} user={user} onUpdateTeam={updateTeam} />}
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
