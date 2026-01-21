
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthView: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const name = displayName || "Operador_" + cred.user.uid.substring(0, 4);

        await updateProfile(cred.user, { displayName: name });

        // Inicializar documento en Firestore
        await setDoc(doc(db, "users", cred.user.uid), {
          id: cred.user.uid,
          name: name,
          email: email,
          points: 100, // Bono de bienvenida
          rank: 999,
          teamId: "",
          achievements: [],
          themeColor: "purple",
        });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error de autenticación. Verifica tu conexión.");
    } finally {
      setIsLoading(false);
    }
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
            {isLogin ? "Acceso al Núcleo" : "Nueva Identidad"}
          </h2>
          <p className="text-gray-500 mt-2 font-rajdhani">
            {isLogin ? "Sincroniza tus datos de operador" : "Crea tu perfil en la red NEON"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">
                Alias de Red
              </label>
              <input
                type="text"
                placeholder="Ej: GhostRunner"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 outline-none text-white focus:border-neon-purple transition-colors"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">
              Email (Enlace)
            </label>
            <input
              type="email"
              placeholder="operador@neon.tech"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 outline-none text-white focus:border-neon-purple transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">
              Cifrado (Password)
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 outline-none text-white focus:border-neon-purple transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-xs text-center font-bold uppercase tracking-tighter">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-orbitron font-bold py-4 rounded-xl uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg"
          >
            {isLoading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              isLogin ? "SINCRONIZAR" : "INICIALIZAR"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 font-rajdhani hover:text-neon-blue transition-colors uppercase text-xs tracking-wider font-bold"
          >
            {isLogin
              ? "¿No tienes ID? Regístrate aquí"
              : "¿Ya eres operador? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
