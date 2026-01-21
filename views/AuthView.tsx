
import React, { useState } from 'react';

interface AuthViewProps {
  onLogin: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dark-base flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/10 blur-[120px] rounded-full"></div>
      
      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-white/10 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue mb-4 shadow-xl shadow-neon-purple/20">
            <i className="fas fa-shield-halved text-3xl text-white"></i>
          </div>
          <h2 className="text-2xl font-orbitron font-bold text-white uppercase tracking-widest">
            {isLogin ? 'Acceso Concedido' : 'Únete a la Red'}
          </h2>
          <p className="text-gray-500 mt-2 font-rajdhani">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">Identidad</label>
            <div className="relative group">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-neon-blue transition-colors"></i>
              <input 
                type="text" 
                placeholder="USUARIO o EMAIL" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 transition-all font-rajdhani text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">Código de Acceso</label>
            <div className="relative group">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-neon-blue transition-colors"></i>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 transition-all font-rajdhani text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-orbitron font-bold py-4 rounded-xl uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-neon-purple/20 relative overflow-hidden group"
          >
            {isLoading ? (
              <i className="fas fa-circle-notch fa-spin text-xl"></i>
            ) : (
              <>
                <span className="relative z-10">{isLogin ? 'Iniciar Sesión' : 'Crear Perfil'}</span>
                <div className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-12 group-hover:left-full transition-all duration-500"></div>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 font-rajdhani hover:text-neon-blue transition-colors uppercase text-xs tracking-wider font-bold"
          >
            {isLogin ? "¿No tienes ID? Regístrate" : "¿Ya tienes cuenta? Ingresa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
