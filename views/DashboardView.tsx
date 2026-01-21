
import React from 'react';
import { User, Team } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardViewProps {
  user: User;
  teams: Team[];
}

const data = [
  { name: 'Lun', score: 4000 },
  { name: 'Mar', score: 3000 },
  { name: 'Mié', score: 2000 },
  { name: 'Jue', score: 2780 },
  { name: 'Vie', score: 1890 },
  { name: 'Sáb', score: 2390 },
  { name: 'Dom', score: 3490 },
];

const StatCard: React.FC<{ label: string; value: string | number; icon: string; color: string }> = ({ label, value, icon, color }) => (
  <div className="glass-card rounded-2xl p-6 border-l-4 border-white/5 hover:translate-y-[-4px] transition-transform duration-300 group" style={{ borderColor: color }}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-xl transition-colors group-hover:bg-opacity-20`} style={{ color }}>
        <i className={`fas ${icon}`}></i>
      </div>
      <span className="text-xs text-green-400 flex items-center gap-1 font-bold">
        <i className="fas fa-arrow-trend-up"></i> +12%
      </span>
    </div>
    <h3 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">{label}</h3>
    <p className="text-2xl font-orbitron font-black text-white">{value}</p>
  </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ user, teams }) => {
  const userTeam = teams.find(t => t.id === user.teamId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Puntos Totales" value={user.points.toLocaleString()} icon="fa-bolt" color="#00f2ff" />
        <StatCard label="Rango Global" value={`#${user.rank}`} icon="fa-globe" color="#bc13fe" />
        <StatCard label="Poder de Equipo" value={userTeam?.score.toLocaleString() || 'N/A'} icon="fa-users-rays" color="#39ff14" />
        <StatCard label="Trofeos" value={user.achievements.length} icon="fa-award" color="#ff00ff" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-orbitron font-bold uppercase tracking-wider text-white">Pulso de Rendimiento</h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-neon-blue"></span>
              <span className="text-xs text-gray-500 uppercase">XP Semanal</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', fontFamily: 'Rajdhani' }}
                  itemStyle={{ color: '#00f2ff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#00f2ff" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col">
          <h3 className="font-orbitron font-bold uppercase tracking-wider text-white mb-6">Actividad Reciente</h3>
          <div className="space-y-6 overflow-y-auto max-h-[300px] pr-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all">
                  <i className="fas fa-code-branch text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-200">Plano <span className="text-neon-blue">#X-90</span> desplegado</p>
                  <span className="text-[10px] text-gray-500 uppercase">Hace 2 horas • +250 XP</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-auto w-full py-3 text-xs uppercase font-bold text-gray-500 hover:text-neon-purple transition-colors border-t border-white/5 pt-4">
            Ver Registros del Sistema
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
