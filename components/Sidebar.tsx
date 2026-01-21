
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (v: View) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-line', label: 'Arena' },
    { id: 'teams', icon: 'fa-users', label: 'Facciones' },
    { id: 'proposals', icon: 'fa-lightbulb', label: 'Planos' },
    { id: 'projects', icon: 'fa-folder-open', label: 'Proyectos' },
    { id: 'awards', icon: 'fa-trophy', label: 'Premios' },
    { id: 'settings', icon: 'fa-cog', label: 'Ajustes' },
  ];

  return (
    <aside className="fixed bottom-0 left-0 w-full lg:w-64 lg:h-full bg-dark-card border-t lg:border-t-0 lg:border-r border-white/5 z-50 overflow-y-auto">
      <div className="hidden lg:flex p-8 items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-blue rounded-lg shadow-lg shadow-neon-purple/20"></div>
        <span className="font-orbitron font-black text-xl tracking-tighter text-white">NEON<span className="text-neon-purple">CORE</span></span>
      </div>

      <nav className="flex lg:flex-col h-full lg:h-auto justify-around lg:justify-start lg:mt-4 px-4 pb-20 lg:pb-0">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-4 lg:px-8 lg:py-3 transition-all duration-300 w-full group
              ${currentView === item.id 
                ? 'text-neon-blue bg-neon-blue/5 border-b-2 lg:border-b-0 lg:border-l-4 border-neon-blue' 
                : 'text-gray-500 hover:text-gray-300'}`}
          >
            <i className={`fas ${item.icon} text-lg lg:text-xl`}></i>
            <span className="text-[9px] lg:text-sm font-rajdhani font-semibold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}

        <button
          onClick={onLogout}
          className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-4 lg:px-8 lg:py-4 text-red-500 hover:bg-red-500/5 transition-all w-full lg:mt-auto mb-4"
        >
          <i className="fas fa-sign-out-alt text-lg lg:text-xl"></i>
          <span className="text-[9px] lg:text-sm font-rajdhani font-semibold uppercase tracking-widest">Salir</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
