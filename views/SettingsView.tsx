
import React, { useState } from 'react';
import { User } from '../types';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface SettingsViewProps {
  user: User;
  onUpdate: (data: Partial<User>) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    themeColor: user.themeColor || 'purple'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, formData);
      onUpdate(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (color: 'blue' | 'purple' | 'green') => {
    setFormData({...formData, themeColor: color});
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 border border-white/10">
          <h3 className="font-orbitron font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Identidad del Operador</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase font-black tracking-widest">Nombre de Red</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-theme outline-none transition-all font-rajdhani"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase font-black tracking-widest">Enlace de Comunicación</label>
                <input 
                  type="email"
                  value={formData.email}
                  readOnly
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-gray-500 outline-none font-rajdhani cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="text-xs text-gray-400 uppercase font-black tracking-widest">Inyección de Color (Tema Energético)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'purple', color: '#bc13fe', label: 'MORADO ÉLITE', icon: 'fa-vial' },
                  { id: 'blue', color: '#00f2ff', label: 'AZUL CRIO', icon: 'fa-snowflake' },
                  { id: 'green', color: '#39ff14', label: 'VERDE TÓXICO', icon: 'fa-biohazard' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id as any)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 group relative overflow-hidden
                      ${formData.themeColor === t.id ? 'border-theme bg-theme/10' : 'border-white/5 bg-black/20 opacity-40 hover:opacity-100 hover:border-white/20'}`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg" style={{ backgroundColor: t.color, color: '#000' }}>
                      <i className={`fas ${t.icon}`}></i>
                    </div>
                    <span className={`text-[10px] uppercase font-black tracking-tighter ${formData.themeColor === t.id ? 'text-white' : 'text-gray-500'}`}>{t.label}</span>
                    {formData.themeColor === t.id && (
                      <div className="absolute top-0 right-0 p-1">
                        <i className="fas fa-check-circle text-theme text-[10px]"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full py-4 rounded-xl font-orbitron font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2
                ${isSaved ? 'bg-neon-green text-black' : 'bg-theme text-black hover:brightness-110 shadow-lg shadow-theme/20'}`}
            >
              <i className={`fas ${isSaving ? 'fa-sync-alt fa-spin' : isSaved ? 'fa-check' : 'fa-save'}`}></i>
              {isSaving ? 'GUARDANDO...' : isSaved ? 'SINCRONIZADO' : 'ACTUALIZAR NÚCLEO'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <h3 className="font-orbitron font-bold text-white uppercase text-[10px] mb-4 tracking-widest">BIO-MÉTRICAS DE RED</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-rajdhani">
                <span className="text-gray-500">Latencia de Enlace</span>
                <span className="text-neon-green">14ms</span>
              </div>
              <div className="flex justify-between items-center text-xs font-rajdhani">
                <span className="text-gray-500">ID Único</span>
                <span className="text-white text-[8px] font-mono">{user.id}</span>
              </div>
              <div className="pt-4">
                <p className="text-[10px] text-gray-500 uppercase font-black mb-2">Integridad del Perfil</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-neon-green h-full w-[95%] shadow-[0_0_5px_#39ff14]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;
