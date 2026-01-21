
import React, { useState } from 'react';
import { Team } from '../types';

interface TeamsViewProps {
  teams: Team[];
  currentUserId: string;
}

const TeamsView: React.FC<TeamsViewProps> = ({ teams, currentUserId }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'my-team'>('leaderboard');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex gap-4 border-b border-white/10">
        <button 
          onClick={() => setActiveTab('leaderboard')}
          className={`pb-4 px-2 text-sm uppercase font-orbitron tracking-widest transition-all ${activeTab === 'leaderboard' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-gray-500'}`}
        >
          Tabla de Clasificación
        </button>
        <button 
          onClick={() => setActiveTab('my-team')}
          className={`pb-4 px-2 text-sm uppercase font-orbitron tracking-widest transition-all ${activeTab === 'my-team' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-gray-500'}`}
        >
          Mi Facción
        </button>
      </div>

      {activeTab === 'leaderboard' && (
        <div className="grid gap-4">
          {teams.sort((a, b) => b.score - a.score).map((team, idx) => (
            <div key={team.id} className="glass-card rounded-xl p-4 flex items-center gap-6 border border-white/5 hover:border-neon-purple/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center font-orbitron font-black text-xl text-gray-500 group-hover:text-neon-purple">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-orbitron font-bold text-white group-hover:text-neon-purple transition-colors">{team.name}</h4>
                <p className="text-xs text-gray-500 italic">"{team.motto}"</p>
              </div>
              <div className="hidden md:flex gap-1">
                {team.members.map((m, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border border-white/10 bg-black flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/${m}/32`} alt="miembro" />
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="font-orbitron font-bold text-neon-blue">{team.score.toLocaleString()} XP</p>
                <span className="text-[10px] text-gray-500 uppercase">{team.members.length} PILOTOS</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'my-team' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8 border border-white/5">
             <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue p-1">
                 <div className="w-full h-full bg-black rounded-xl flex items-center justify-center text-4xl text-neon-purple">
                   <i className="fas fa-ghost"></i>
                 </div>
               </div>
               <div>
                 <h2 className="text-3xl font-orbitron font-black text-white">ESPECTROS NEÓN</h2>
                 <p className="text-neon-blue tracking-tighter uppercase font-bold text-sm">Rango #3 Global</p>
               </div>
             </div>
             
             <div className="space-y-4">
               <h3 className="text-xs font-bold uppercase text-gray-500 tracking-widest border-b border-white/10 pb-2">Pilotos Activos</h3>
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src={`https://picsum.photos/seed/m${i}/32`} className="w-10 h-10 rounded-full border border-neon-blue" alt="" />
                      <div>
                        <p className="text-sm font-bold text-white">Piloto_{i}42</p>
                        <p className="text-[10px] text-gray-500 uppercase">Especialista</p>
                      </div>
                    </div>
                    <span className="text-xs text-neon-green font-bold">EN LÍNEA</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h3 className="font-orbitron text-sm font-bold text-white mb-4 uppercase">Estrategia de Equipo</h3>
              <textarea 
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-rajdhani text-gray-300 min-h-[100px] outline-none focus:border-neon-purple"
                placeholder="Transmite un mensaje a tu facción..."
              ></textarea>
              <button className="mt-4 w-full bg-neon-purple/20 border border-neon-purple/50 text-neon-purple font-bold py-3 rounded-xl uppercase text-xs tracking-widest hover:bg-neon-purple hover:text-white transition-all">
                Enviar Transmisión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsView;
