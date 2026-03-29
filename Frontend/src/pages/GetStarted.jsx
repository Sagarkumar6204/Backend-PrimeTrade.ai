import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-blue-900 flex flex-col items-center justify-center px-4 overflow-hidden relative">
      
      {/* Decorative Background Elements (Trading Grid Vibe) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-4xl text-center z-10 space-y-10">
        
        {/* Animated Badge */}
        <div className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-[0.2em] text-blue-400 uppercase bg-blue-900/30 border border-blue-500/30 rounded-full animate-pulse">
          Next-Gen Trading Intelligence v3.0
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
          Master Your Market <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            With PrimeTrade.ai
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          Experience the pinnacle of **Trading Task Management**. Seamlessly coordinate 
          between Admin protocols and User execution with our secure, RBAC-enabled AI infrastructure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-blue-400/50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
          >
            Initialize Account
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-10 py-4 bg-transparent text-blue-400 font-bold rounded-xl border-2 border-blue-500/30 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
          >
            Access Terminal
          </button>
        </div>

        {/* Professional Metrics (Iconized) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-slate-800">
          <div className="group">
            <div className="text-blue-500 text-3xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Ultra-Low Latency</h3>
            <p className="text-slate-500 text-xs mt-1">Real-time task synchronization</p>
          </div>
          <div className="group">
            <div className="text-emerald-500 text-3xl mb-2 group-hover:scale-110 transition-transform">🔒</div>
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Enterprise RBAC</h3>
            <p className="text-slate-500 text-xs mt-1">Secure role-based access</p>
          </div>
          <div className="group">
            <div className="text-purple-500 text-3xl mb-2 group-hover:scale-110 transition-transform">🤖</div>
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">AI Driven Logic</h3>
            <p className="text-slate-500 text-xs mt-1">Intelligent workflow scaling</p>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 text-slate-500 text-[10px] tracking-[0.3em] uppercase">
        © 2026 PrimeTrade.ai Intelligence Systems | Powered by MERN Stack
      </footer>
    </div>
  );
};

export default GetStarted;