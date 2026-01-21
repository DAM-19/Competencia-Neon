
import React from 'react';
import { User, Achievement } from '../types';

interface AwardsViewProps {
  user: User;
  achievements: Achievement[];
}

const AwardsView: React.FC<AwardsViewProps> = ({ user, achievements }) => {
  const getRarityText = (r: string) => {
    switch(r) {
      case 'legendary': return 'Legendario';
      case 'epic': return 'Épico';
      case 'rare': return 'Raro';
      case 'common': return 'Común';
      default: return r;
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/20 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-32 h-32 rounded-full border-4 border-neon-purple p-2 animate-pulse-slow">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-4xl text-neon-purple shadow-[0_0_20px_rgba(188,19,254,0.3)]">
              <i className="fas fa-crown"></i>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-orbitron font-black text-white mb-2">MAESTRO ÉLITE</h2>
            <p className="text-gray-400 uppercase tracking-[0.2em] font-bold text-sm">
              Progreso de Rango: <span className="text-neon-purple">78% para Leyenda</span>
            </p>
            <div className="w-full md:w-96 h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
              <div className="bg-gradient-to-r from-neon-purple to-neon-pink h-full w-[78%]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const isUnlocked = user.achievements.includes(ach.id);
          return (
            <div 
              key={ach.id} 
              className={`glass-card rounded-2xl p-6 border transition-all duration-500 group relative
                ${isUnlocked ? 'border-neon-purple shadow-[0_0_20px_rgba(188,19,254,0.1)]' : 'border-white/5 opacity-50'}`}
            >
              {!isUnlocked && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 rounded-2xl backdrop-blur-[2px]">
                   <i className="fas fa-lock text-2xl text-gray-500"></i>
                 </div>
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 
                ${ach.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-500' : ach.rarity === 'epic' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-neon-blue/20 text-neon-blue'}`}>
                <i className={`fas ${ach.icon}`}></i>
              </div>
              <h3 className="font-orbitron font-bold text-white mb-1 uppercase text-sm tracking-wider">{ach.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{ach.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${ach.rarity === 'legendary' ? 'bg-yellow-500 text-black' : 'bg-white/10 text-gray-400'}`}>
                  {getRarityText(ach.rarity)}
                </span>
                {isUnlocked && <span className="text-[10px] text-neon-green font-bold uppercase"><i className="fas fa-check-circle mr-1"></i> Obtenido</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AwardsView;
