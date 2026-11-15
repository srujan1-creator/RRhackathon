import React from 'react';
import { Shield, Flame, BarChart2, Cpu, Crosshair, Sparkles, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSimulator }) => {
  const navItems = [
    { id: 'rankings', label: 'Rankings & Profiles', icon: BarChart2 },
    { id: 'leverage', label: 'Leverage Science', icon: Cpu },
    { id: 'rise', label: 'Rise to Occasion', icon: Flame },
    { id: 'reliability', label: 'Bootstrap & Noise', icon: Sparkles },
    { id: 'rr-war-room', label: 'RR War Room', icon: Shield },
    { id: 'methodology', label: 'Methodology Report', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050814]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-rose-600 to-blue-700 p-[2px] shadow-glow-pink">
              <div className="w-full h-full bg-[#070B19] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300 text-lg tracking-wider">RR</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  The Pressure-Proof Index <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 font-mono">PPI v2.0</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>SupeRR Selector Season 2</span>
                <span className="text-slate-600">•</span>
                <span className="text-pink-400 font-medium">Round 1 Methodology</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">810 Matches Calibrated</span>
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSimulator}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shadow-glow-pink transition-all"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Simulate</span>
          </button>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/20 to-blue-500/20 text-pink-300 border border-pink-500/40 shadow-sm shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={onOpenSimulator}
            className="hidden md:flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-semibold shadow-glow-pink transition-all hover:scale-105 active:scale-95"
          >
            <Crosshair className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Match Simulator</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
