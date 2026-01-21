
import React, { useState } from 'react';
import { Team, User } from '../types';

interface TeamsViewProps {
  teams: Team[];
  user: User;
  onUpdateTeam: (id: string, data: Partial<Team>) => void;
}

const TeamsView: React.FC<TeamsViewProps> = ({ teams, user, onUpdateTeam }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'management'>('leaderboard');
  const userTeam = teams.find(t => t.id === user.teamId);
  const isLeader = userTeam?.members[0] === user.id; // El primer miembro es el líder en nuestro mock

  const [editMode, setEditMode] = useState(false);
  const [teamForm, setTeamForm] = useState({
    name: userTeam?.name || '',
    motto: userTeam?.motto || ''
  });

  const handleSaveTeam = () => {
    if (userTeam) {
      onUpdateTeam(userTeam.id, teamForm);
      setEditMode(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex gap-4 border-b border-white/10">
        <button 
          onClick={() => setActiveTab('leaderboard')}
          className={`pb-4 px-2 text-sm uppercase font-orbitron tracking-widest transition-all ${activeTab === 'leaderboard' ? 'text-theme border-b-2 border-theme' : 'text-gray-500'}`}
        >
          Ranking de Facciones
        </button>
        {userTeam && (
          <button 
            onClick={() => setActiveTab('management')}
            className={`pb-4 px-2 text-sm uppercase font-orbitron tracking-widest transition-all ${activeTab === 'management' ? 'text-theme border-b-2 border-theme' : 'text-gray-500'}`}
          >
            {isLeader ? 'Panel de Comando' : 'Mi Facción'}
          </button>
        )}
      </div>

      {activeTab === 'leaderboard' && (
        <div className="grid gap-4">
          {teams.sort((a, b) => b.score - a.score).map((team, idx) => (
            <div key={team.id} className="glass-card rounded-xl p-4 flex items-center gap-6 border border-white/5 hover:border-theme/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center font-orbitron font-black text-xl text-gray-500 group-hover:text-theme">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-orbitron font-bold text-white group-hover:text-theme transition-colors">{team.name}</h4>
                <p className="text-xs text-gray-500 italic">"{team.motto}"</p>
              </div>
              <div className="hidden md:flex -space-x-3">
                {team.members.map((m, i) => (
                  <img key={i} src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${m}`} className="w-8 h-8 rounded-full border-2 border-dark-base bg-dark-card" alt="avatar" />
                ))}
              </div>
              <div className="text-right">
                <p className="font-orbitron font-bold text-theme">{team.score.toLocaleString()} XP</p>
                <span className="text-[10px] text-gray-500 uppercase">{team.members.length} MIEMBROS</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'management' && userTeam && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-theme/10 blur-3xl -mr-16 -mt-16"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-theme to-dark-card p-1 shadow-lg shadow-theme/20">
                  <div className="w-full h-full bg-dark-base rounded-xl flex items-center justify-center text-4xl text-theme">
                    <i className="fas fa-shield-virus"></i>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  {editMode ? (
                    <div className="space-y-4">
                      <input 
                        className="bg-black/40 border border-white/10 rounded-lg p-2 text-white font-orbitron w-full outline-none focus:border-theme"
                        value={teamForm.name}
                        onChange={e => setTeamForm({...teamForm, name: e.target.value})}
                      />
                      <input 
                        className="bg-black/40 border border-white/10 rounded-lg p-2 text-gray-400 w-full outline-none focus:border-theme text-sm"
                        value={teamForm.motto}
                        onChange={e => setTeamForm({...teamForm, motto: e.target.value})}
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl font-orbitron font-black text-white uppercase tracking-tighter">{userTeam.name}</h2>
                      <p className="text-theme font-bold text-sm mb-2">Lema: <span className="italic text-gray-400 font-normal">"{userTeam.motto}"</span></p>
                    </>
                  )}
                </div>
                {isLeader && (
                  <button 
                    onClick={() => editMode ? handleSaveTeam() : setEditMode(true)}
                    className="px-6 py-2 rounded-lg border border-theme text-theme text-xs font-bold uppercase hover:bg-theme hover:text-black transition-all"
                  >
                    {editMode ? 'GUARDAR' : 'EDITAR PERFIL'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-black">Rango</p>
                  <p className="text-xl font-orbitron text-white">#{userTeam.rank}</p>
                </div>
                <div className="text-center border-x border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-black">Poder</p>
                  <p className="text-xl font-orbitron text-theme">{userTeam.score / 1000}k</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-black">Escuadrón</p>
                  <p className="text-xl font-orbitron text-white">{userTeam.members.length}</p>
                </div>
              </div>
            </div>

            {/* Member List */}
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-orbitron font-bold text-white text-sm uppercase tracking-widest">Miembros del Escuadrón</h3>
                {isLeader && <button className="text-[10px] text-theme font-black hover:underline uppercase">+ Invitar Operador</button>}
              </div>
              <div className="space-y-3">
                {userTeam.members.map((memberId, idx) => (
                  <div key={memberId} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-theme/30 transition-all">
                    <div className="flex items-center gap-4">
                      <img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${memberId}`} className="w-10 h-10 rounded-full border border-theme/30 bg-black" alt="" />
                      <div>
                        <p className="text-sm font-bold text-white">{memberId === user.id ? 'TÚ (Operador Central)' : `Sujeto_${memberId}`}</p>
                        <p className="text-[10px] text-theme uppercase font-black">{idx === 0 ? 'LÍDER DE FACCIÓN' : 'ESPECIALISTA'}</p>
                      </div>
                    </div>
                    {isLeader && memberId !== user.id && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-500 hover:text-theme transition-colors"><i className="fas fa-chevron-up"></i></button>
                        <button className="p-2 text-gray-500 hover:text-red-500 transition-colors"><i className="fas fa-user-minus"></i></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Tactics */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-theme/20 bg-theme/5">
              <h3 className="font-orbitron text-xs font-black text-white mb-4 uppercase tracking-[0.2em]">Estado de Misión</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Eficiencia Global</span>
                  <span className="text-theme font-bold">84%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-theme h-full w-[84%] shadow-[0_0_8px_var(--neon-primary)]"></div>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase">La facción mantiene una sincronización estable con el núcleo NEON.</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/5">
               <h3 className="font-orbitron text-xs font-black text-white mb-4 uppercase">Directivas de Canal</h3>
               <div className="bg-black/60 rounded-lg p-3 h-48 overflow-y-auto space-y-3 font-mono text-[10px] scrollbar-theme">
                 <p className="text-neon-green">[SISTEMA]: Facción autenticada.</p>
                 <p className="text-gray-500">[Piloto_u2]: ¿Alguien para el raid de las 22:00?</p>
                 <p className="text-theme">[LÍDER]: Mantengan la posición, el parche v2.0 se acerca.</p>
                 <p className="text-gray-500">[Piloto_u3]: Confirmado. Protocolo de silencio activo.</p>
               </div>
               <div className="mt-4 flex gap-2">
                 <input className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white outline-none focus:border-theme" placeholder="Escribir al canal..." />
                 <button className="bg-theme text-black p-2 rounded-lg text-xs"><i className="fas fa-paper-plane"></i></button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsView;
