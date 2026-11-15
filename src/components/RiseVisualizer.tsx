import React, { useState } from 'react';
import { Flame, BarChart2, Zap } from 'lucide-react';
import { TOP_BATTERS, TOP_BOWLERS } from '../data/ppiData';

export const RiseVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'batters' | 'bowlers'>('batters');

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 text-pink-400" />
              <span>Pressure vs Usual Delta</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">
              "Rising to the Occasion" vs "Steady Composure"
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Comparing how players perform in ordinary (low-pressure) situations versus high-pressure clutch states. 
              Some players dramatically elevate their scoring or bowling suppression, while others maintain steady, ice-cold reliability.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('batters')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'batters'
                  ? 'bg-pink-600 text-white shadow-glow-pink'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Batters Strike Rate Delta</span>
            </button>
            <button
              onClick={() => setActiveTab('bowlers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'bowlers'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Bowlers Runs Saved Delta</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Bars Comparison */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="text-xs text-slate-400 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-slate-600" />
              <span>Usual (Low-Pressure) Context</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-pink-500" />
              <span className="text-white font-medium">High-Pressure Balls</span>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
            {activeTab === 'batters' ? 'Strike rate points above context expectation' : 'Runs per over saved vs context expectation'}
          </span>
        </div>

        {activeTab === 'batters' ? (
          <div className="space-y-4">
            {TOP_BATTERS.map((batter) => {
              const usualWidth = Math.max(2, (batter.srUsualDiff / 90) * 100);
              const pressureWidth = Math.max(2, (batter.srDiff / 90) * 100);
              const rise = batter.srDiff - batter.srUsualDiff;

              return (
                <div key={batter.name} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white group-hover:text-pink-400 transition-colors flex items-center gap-2">
                      <span className="font-mono text-slate-500 w-4 text-right">#{batter.rank}</span>
                      {batter.name}
                      {rise >= 25 && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/40">
                          Big Match Riser
                        </span>
                      )}
                      {batter.dismissalsPer100Actual <= 3.8 && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/40">
                          Low-Variance Anchor
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-slate-400">Usual: +{batter.srUsualDiff}</span>
                      <span className="text-pink-400 font-bold">Pressure: +{batter.srDiff}</span>
                      <span className="text-emerald-400 font-semibold">(+{rise} boost)</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {/* Ordinary Bar */}
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-slate-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${usualWidth}%` }}
                        title={`Usual: +${batter.srUsualDiff} SR`}
                      />
                    </div>
                    {/* Pressure Bar */}
                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-rose-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-pink-500/50"
                        style={{ width: `${pressureWidth}%` }}
                        title={`High-Pressure: +${batter.srDiff} SR`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {TOP_BOWLERS.map((bowler) => {
              // Bowlers runs saved: scale from -1.0 to +3.0
              const minVal = -0.5;
              const maxVal = 2.8;
              const range = maxVal - minVal;

              const usualPct = Math.max(0, ((bowler.economyUsualSaved - minVal) / range) * 100);
              const pressurePct = Math.max(0, ((bowler.economySaved - minVal) / range) * 100);
              const rise = bowler.economySaved - bowler.economyUsualSaved;

              return (
                <div key={bowler.name} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      <span className="font-mono text-slate-500 w-4 text-right">#{bowler.rank}</span>
                      {bowler.name}
                      {bowler.economySaved >= 1.4 && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/40">
                          Elite Squeezer
                        </span>
                      )}
                      {bowler.wicketsPer100Actual >= 7.0 && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/40">
                          Strike Wicket-Taker
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-slate-400">Usual: {bowler.economyUsualSaved.toFixed(2)}</span>
                      <span className="text-blue-400 font-bold">Pressure: {bowler.economySaved.toFixed(2)}</span>
                      <span className="text-emerald-400 font-semibold">({rise >= 0 ? `+${rise.toFixed(2)}` : rise.toFixed(2)} saved)</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {/* Ordinary Bar */}
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-slate-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${usualPct}%` }}
                        title={`Usual: ${bowler.economyUsualSaved.toFixed(2)} RPO`}
                      />
                    </div>
                    {/* Pressure Bar */}
                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-blue-500/50"
                        style={{ width: `${pressurePct}%` }}
                        title={`High-Pressure: ${bowler.economySaved.toFixed(2)} RPO saved`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Narrative Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong className="text-pink-300">Methodology takeaway:</strong> Players like 
          <strong className="text-white"> Vaibhav Sooryavanshi (+61 delta over usual)</strong>, 
          <strong className="text-white"> Cameron Green (+27)</strong>, and 
          <strong className="text-white"> Daryl Mitchell (+26)</strong> embody the explosive "rises to the occasion" profile. 
          In contrast, anchors like <strong className="text-white">Shreyas Iyer</strong> and <strong className="text-white">Tilak Varma</strong> maintain rock-solid composure in both ordinary and crunch overs, earning their spots via ultra-low dismissal rates under pressure (3.4 and 3.8 per 100 balls).
        </div>
      </div>
    </section>
  );
};
