
import React, { useState, useEffect } from 'react';
import { User, View, Team, Proposal, Achievement } from './types';
import Sidebar from './components/Sidebar';
import AuthView from './views/AuthView';
import DashboardView from './views/DashboardView';
import TeamsView from './views/TeamsView';
import ProposalsView from './views/ProposalsView';
import AwardsView from './views/AwardsView';
import ChatBot from './components/ChatBot';

const INITIAL_USER: User = {
  id: 'u1',
  name: 'CyberRunner',
  email: 'cyber@neon.tech',
  points: 12450,
  rank: 12,
  teamId: 't1',
  achievements: ['a1', 'a2']
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
    const saved = localStorage.getItem('neon_user');
    if (saved) {
      setUser(JSON.parse(saved));
      setView('dashboard');
    }
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

  const getViewTitle = (v: View) => {
    switch(v) {
      case 'dashboard': return 'Zona de Combate';
      case 'teams': return 'Facciones';
      case 'proposals': return 'Planos Maestros';
      case 'awards': return 'Salón de la Fama';
      default: return '';
    }
  };

  if (!user && view === 'auth') {
    return <AuthView onLogin={() => handleLogin(INITIAL_USER)} />;
  }

  return (
    <div className="flex min-h-screen bg-dark-base text-gray-200">
      <Sidebar currentView={view} setView={setView} onLogout={handleLogout} />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 transition-all duration-300">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-neon-purple uppercase tracking-widest neon-text-glow">
              {getViewTitle(view)}
            </h1>
            <p className="text-gray-500 font-rajdhani">Bienvenido de nuevo, <span className="text-neon-blue">{user?.name}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-gray-400 uppercase tracking-tighter">Rango Actual</span>
              <span className="text-xl font-bold font-orbitron text-neon-green">#{user?.rank}</span>
            </div>
            <img 
              src={`https://picsum.photos/seed/${user?.id}/100`} 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border-2 border-neon-purple p-0.5"
            />
          </div>
        </header>

        <div className="animate-fade-in">
          {view === 'dashboard' && <DashboardView user={user!} teams={teams} />}
          {view === 'teams' && <TeamsView teams={teams} currentUserId={user!.id} />}
          {view === 'proposals' && <ProposalsView user={user!} />}
          {view === 'awards' && <AwardsView user={user!} achievements={INITIAL_ACHIEVEMENTS} />}
        </div>
      </main>

      <ChatBot context={{ user, teams }} />
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
