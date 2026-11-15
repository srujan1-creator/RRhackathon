import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { RankingsSection } from './components/RankingsSection';
import { LeverageExplorer } from './components/LeverageExplorer';
import { RiseVisualizer } from './components/RiseVisualizer';
import { NoiseAndValidation } from './components/NoiseAndValidation';
import { RRAuctionWarRoom } from './components/RRAuctionWarRoom';
import { MethodologyReport } from './components/MethodologyReport';
import { PlayerModal } from './components/PlayerModal';
import { LivePressureSimulator } from './components/LivePressureSimulator';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('rankings');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-8">
        {/* Always-Visible Executive KPI Banner (Collapsible or present) */}
        <ExecutiveSummary
          onSelectPlayer={(name) => setSelectedPlayer(name)}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />

        {/* Dynamic Content Based on Active Tab */}
        <div className="animate-in fade-in duration-300">
          {activeTab === 'rankings' && (
            <RankingsSection onSelectPlayer={(name) => setSelectedPlayer(name)} />
          )}

          {activeTab === 'leverage' && (
            <LeverageExplorer />
          )}

          {activeTab === 'rise' && (
            <RiseVisualizer />
          )}

          {activeTab === 'reliability' && (
            <NoiseAndValidation />
          )}

          {activeTab === 'rr-war-room' && (
            <RRAuctionWarRoom />
          )}

          {activeTab === 'methodology' && (
            <MethodologyReport />
          )}
        </div>
      </main>

      {/* Modals */}
      <PlayerModal
        playerName={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />

      <LivePressureSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSelectPlayer={(name) => setSelectedPlayer(name)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-[#070B19]/80 py-8 px-4 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pink-600/20 border border-pink-500/40 flex items-center justify-center font-bold text-pink-400 font-mono">
              RR
            </div>
            <div>
              <div className="font-semibold text-white">SupeRR Selector S2 | Round 1</div>
              <div className="text-[11px] text-slate-500">The Pressure-Proof Index (PPI) • Rajasthan Royals Analytics</div>
            </div>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500 space-y-0.5">
            <div>810 Matches • 193,294 Deliveries • Calibrated Win-Probability Gradient Boosting</div>
            <div>Strictly reproducible • Bootstrap uncertainty intervals • Rajasthan Royals Auction War Room</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
