
import React, { useState } from 'react';
import { User, Proposal } from '../types';

const INITIAL_PROPOSALS: Proposal[] = [
  { id: 'p1', author: 'NexusOne', title: 'Escalado de Recompensas', description: 'Implementar lógica que escale las recompensas basadas en la dificultad de la tarea y nivel del jugador.', upvotes: 142, downvotes: 12, status: 'approved' },
  { id: 'p2', author: 'GlitchMaster', title: 'Guerras de Facción 2.0', description: 'Batallas de facción en tiempo real durante eventos de fin de semana.', upvotes: 89, downvotes: 45, status: 'pending' },
  { id: 'p3', author: 'ZeroDay', title: 'Temas de Red Neuronal', description: 'Inyección de CSS personalizado para miembros de élite para personalizar el panel.', upvotes: 12, downvotes: 88, status: 'rejected' },
];

const ProposalsView: React.FC<{ user: User }> = ({ user }) => {
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [showModal, setShowModal] = useState(false);

  const getStatusText = (s: string) => {
    switch(s) {
      case 'approved': return 'Aprobado';
      case 'pending': return 'Pendiente';
      case 'rejected': return 'Rechazado';
      default: return s;
    }
  };

  const handleVote = (id: string, type: 'up' | 'down') => {
    setProposals(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          upvotes: type === 'up' ? p.upvotes + 1 : p.upvotes,
          downvotes: type === 'down' ? p.downvotes + 1 : p.downvotes
        };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white uppercase">Archivo de Planos</h2>
          <p className="text-sm text-gray-500">Vota por las próximas actualizaciones del núcleo</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-neon-blue text-black font-bold px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,242,255,0.5)] transition-all uppercase text-xs tracking-tighter"
        >
          <i className="fas fa-plus"></i> Enviar Plano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proposals.map(p => (
          <div key={p.id} className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col h-full hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest 
                ${p.status === 'approved' ? 'bg-green-500/20 text-green-400' : p.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                {getStatusText(p.status)}
              </span>
              <span className="text-[10px] text-gray-500 uppercase">Por {p.author}</span>
            </div>
            <h3 className="text-lg font-orbitron font-bold text-white mb-2">{p.title}</h3>
            <p className="text-sm text-gray-400 flex-1 mb-6 leading-relaxed">{p.description}</p>
            
            <div className="flex items-center gap-4 border-t border-white/5 pt-4">
              <button 
                onClick={() => handleVote(p.id, 'up')}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-neon-blue/20 hover:text-neon-blue transition-all"
              >
                <i className="fas fa-arrow-up"></i>
                <span className="font-orbitron text-xs">{p.upvotes}</span>
              </button>
              <button 
                onClick={() => handleVote(p.id, 'down')}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all"
              >
                <i className="fas fa-arrow-down"></i>
                <span className="font-orbitron text-xs">{p.downvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-lg rounded-2xl p-8 border border-neon-blue/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-orbitron font-bold text-white">ENVIAR PLANO MAESTRO</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><i className="fas fa-times text-xl"></i></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Título del Proyecto</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-neon-blue" placeholder="Nombre de la mejora..." />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Descripción Técnica</label>
                <textarea className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-neon-blue min-h-[120px]" placeholder="Explica las ventajas estratégicas..."></textarea>
              </div>
              <button className="w-full bg-neon-blue text-black font-black py-4 rounded-xl uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
                SUBIR AL NÚCLEO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalsView;
