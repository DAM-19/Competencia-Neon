
import React, { useState, useEffect } from 'react';
import { User, View, Team, Project, Achievement } from './types';
import Sidebar from './components/Sidebar';
import AuthView from './views/AuthView';
import DashboardView from './views/DashboardView';
import TeamsView from './views/TeamsView';
import ProposalsView from './views/ProposalsView';
import AwardsView from './views/AwardsView';
import SettingsView from './views/SettingsView';
import ProjectsView from './views/ProjectsView';
import ChatBot from './components/ChatBot';

const INITIAL_USER: User = {
  id: 'u1',
  name: 'CyberRunner',
  email: 'cyber@neon.tech',
  points: 12450,
  rank: 12,
  teamId: 't1',
  achievements: ['a1', 'a2'],
  themeColor: 'purple'
};

const INITIAL_TEAMS: Team[] = [
  { id: 't1', name: 'ESPECTROS NEÓN', members: ['u1', 'u2', 'u3'], score: 45000, rank: 3, motto: 'Sombras en la red.' },
  { id: 't2', name: 'CORREDORES SYNTH', members: ['u4', 'u5'], score: 32000, rank: 8, motto: 'La velocidad es la única verdad.' },
  { id: 't3', name: 'CAMINANTES DEL VACÍO', members: ['u6'], score: 56000, rank: 1, motto: 'Abraza el silencio.' }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', name: 'Primera Sangre', icon: 'fa-bolt', description: 'Completa tu primera tarea', rarity: 'common' },
  { id: 'a2', name: 'Señor del Cyber', icon: 'fa-crown', description: 'Alcanza el top 10 del ranking', rarity: 'epic' },
  { id: 'a3', name: 'Samurái del Código', icon: 'fa-dragon', description: 'Envía 50 propuestas aprobadas', rarity: 'legendary' }
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('auth');
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('neon_user');
    const savedTeams = localStorage.getItem('neon_teams');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTeams) setTeams(JSON.parse(savedTeams));
    if (savedUser) setView('dashboard');
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    setView('dashboard');
    localStorage.setItem('neon_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    setView('auth');
    localStorage.removeItem('neon_user');
  };

  const updateUser = (newData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...newData };
    setUser(updated);
    localStorage.setItem('neon_user', JSON.stringify(updated));
  };

  const updateTeam = (teamId: string, newData: Partial<Team>) => {
    const updatedTeams = teams.map(t => t.id === teamId ? { ...t, ...newData } : t);
    setTeams(updatedTeams);
    localStorage.setItem('neon_teams', JSON.stringify(updatedTeams));
  };

  const getViewTitle = (v: View) => {
    switch(v) {
      case 'dashboard': return 'Zona de Combate';
      case 'teams': return 'Facciones';
      case 'proposals': return 'Planos Maestros';
      case 'awards': return 'Salón de la Fama';
      case 'settings': return 'Núcleo de Configuración';
      case 'projects': return 'Archivos de Misión';
      default: return '';
    }
  };

  // Colores dinámicos basados en el tema
  const themeColors = {
    purple: { main: '#bc13fe', text: 'text-neon-purple', border: 'border-neon-purple', bg: 'bg-neon-purple' },
    blue: { main: '#00f2ff', text: 'text-neon-blue', border: 'border-neon-blue', bg: 'bg-neon-blue' },
    green: { main: '#39ff14', text: 'text-neon-green', border: 'border-neon-green', bg: 'bg-neon-green' }
  };

  const currentTheme = themeColors[user?.themeColor || 'purple'];

  if (!user && view === 'auth') {
    return <AuthView onLogin={() => handleLogin(INITIAL_USER)} />;
  }

  return (
    <div className={`flex min-h-screen bg-dark-base text-gray-200 transition-colors duration-500`}>
      {/* Inyección de CSS dinámico para el tema */}
      <style>{`
        :root {
          --neon-primary: ${currentTheme.main};
          --neon-glow: ${currentTheme.main}44;
        }
        .text-theme { color: var(--neon-primary); }
        .border-theme { border-color: var(--neon-primary); }
        .bg-theme { background-color: var(--neon-primary); }
        .neon-text-glow { text-shadow: 0 0 10px var(--neon-primary); }
        .neon-border-glow { box-shadow: 0 0 15px var(--neon-glow); }
        .scrollbar-theme::-webkit-scrollbar-thumb { background: var(--neon-primary); }
      `}</style>

      <Sidebar currentView={view} setView={setView} onLogout={handleLogout} />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 transition-all duration-300 scrollbar-theme overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-orbitron font-bold uppercase tracking-widest neon-text-glow text-theme`}>
              {getViewTitle(view)}
            </h1>
            <p className="text-gray-500 font-rajdhani">Bienvenido, Operador <span className="text-theme font-bold">{user?.name}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-gray-400 uppercase tracking-tighter">Rango Global</span>
              <span className="text-xl font-bold font-orbitron text-neon-green">#{user?.rank}</span>
            </div>
            <img 
              src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.name}&backgroundColor=${user?.themeColor === 'blue' ? '00f2ff' : user?.themeColor === 'green' ? '39ff14' : 'bc13fe'}`} 
              alt="Avatar" 
              className={`w-12 h-12 rounded-full border-2 p-0.5 border-theme shadow-lg shadow-theme/20`}
            />
          </div>
        </header>

        <div className="animate-fade-in pb-20 lg:pb-0">
          {view === 'dashboard' && <DashboardView user={user!} teams={teams} />}
          {view === 'teams' && <TeamsView teams={teams} user={user!} onUpdateTeam={updateTeam} />}
          {view === 'proposals' && <ProposalsView user={user!} />}
          {view === 'awards' && <AwardsView user={user!} achievements={INITIAL_ACHIEVEMENTS} />}
          {view === 'settings' && <SettingsView user={user!} onUpdate={updateUser} />}
          {view === 'projects' && <ProjectsView user={user!} />}
        </div>
      </main>

      <ChatBot context={{ user, teams }} />
    </div>
  );
};

export default App;
