
import React, { useState } from 'react';
import { User, Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  { 
    id: 'pr1', 
    title: 'Protocolo de Seguridad X-12', 
    description: 'Implementación de un sistema de firewall reactivo basado en aprendizaje automático para detener ataques de inyección.', 
    type: 'team', 
    status: 'deployed', 
    date: '2024-03-15',
    techStack: ['Python', 'Docker', 'AWS'] 
  },
  { 
    id: 'pr2', 
    title: 'Terminal de Bio-Acceso', 
    description: 'Diseño de interfaz para escáneres retinianos con respuesta en milisegundos y encriptación de extremo a extremo.', 
    type: 'solo', 
    status: 'in-progress', 
    date: '2024-05-02',
    techStack: ['React', 'TypeScript', 'Rust'] 
  },
  { 
    id: 'pr3', 
    title: 'Indexador de Red Oscura', 
    description: 'Algoritmo de búsqueda optimizado para bases de datos no estructuradas en entornos de baja conectividad.', 
    type: 'team', 
    status: 'archived', 
    date: '2023-11-20',
    techStack: ['Go', 'MongoDB', 'Redis'] 
  }
];

const ProjectsView: React.FC<{ user: User }> = ({ user }) => {
  const [filter, setFilter] = useState<'all' | 'solo' | 'team'>('all');

  const filteredProjects = MOCK_PROJECTS.filter(p => filter === 'all' || p.type === filter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'deployed': return 'text-neon-green border-neon-green/30 bg-neon-green/5';
      case 'in-progress': return 'text-theme border-theme/30 bg-theme/5';
      case 'archived': return 'text-gray-500 border-white/10 bg-white/5';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white uppercase tracking-widest">Base de Datos de Misiones</h2>
          <p className="text-sm text-gray-500">Repositorio cifrado de desarrollos técnicos</p>
        </div>
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
          {['all', 'solo', 'team'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all
                ${filter === f ? 'bg-theme text-black shadow-lg shadow-theme/30' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {f === 'all' ? 'Todos' : f === 'solo' ? 'Individual' : 'Equipo'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="glass-card rounded-2xl border border-white/5 hover:border-theme/40 transition-all flex flex-col group overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <i className={`fas ${project.type === 'team' ? 'fa-users' : 'fa-user'} text-6xl`}></i>
            </div>

            <div className="p-6 flex-1 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusColor(project.status)}`}>
                  {project.status === 'deployed' ? 'OPERATIVO' : project.status === 'in-progress' ? 'EN DESARROLLO' : 'ARCHIVADO'}
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase font-mono">{project.date}</span>
              </div>
              
              <h3 className="text-lg font-orbitron font-bold text-white mb-3 group-hover:text-theme transition-colors uppercase tracking-tight">{project.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 font-rajdhani">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400 font-mono border border-white/5">#{tech}</span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/5 border-t border-white/5 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${project.type === 'team' ? 'bg-theme' : 'bg-neon-pink'}`}></div>
                <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest">{project.type === 'team' ? 'Directiva de Facción' : 'Misión Individual'}</span>
              </div>
              <button className="text-theme hover:text-white transition-colors bg-theme/10 w-8 h-8 rounded-full flex items-center justify-center">
                <i className="fas fa-eye text-xs"></i>
              </button>
            </div>
          </div>
        ))}

        {/* New Project Placeholder */}
        <button className="glass-card rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-gray-500 hover:border-theme hover:text-theme transition-all group min-h-[250px]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform border border-white/5 group-hover:border-theme/30 shadow-inner">
            <i className="fas fa-plus"></i>
          </div>
          <span className="font-orbitron font-bold uppercase text-xs tracking-[0.2em]">Registrar Nueva Misión</span>
          <p className="text-[9px] uppercase mt-2 opacity-50">Sincronizar con el núcleo NEON</p>
        </button>
      </div>
    </div>
  );
};

export default ProjectsView;
