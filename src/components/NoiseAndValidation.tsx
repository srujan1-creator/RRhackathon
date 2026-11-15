import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { TOP_BATTERS, TOP_BOWLERS, TEMPORAL_VALIDATION, SENSITIVITY_TABLE } from '../data/ppiData';

export const NoiseAndValidation: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'batters' | 'bowlers'>('batters');

  const currentList = selectedRole === 'batters' ? TOP_BATTERS : TOP_BOWLERS;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Statistical Rigor & Honesty</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">
          Bootstrap Uncertainty & Predictive Validation
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
          T20 pressure samples are inherently small and noisy. The model embraces this truth through 
          <strong className="text-amber-300"> 200 match-level bootstrap resamples</strong> and 
          <strong className="text-emerald-300"> temporal out-of-sample testing</strong>. The top cohort is highly robust, even if exact intra-top-10 ranking fluctuates.
        </p>
      </div>

      {/* Bootstrap Whiskers Chart */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <span>Bootstrap Rank Ranges (10th–90th Percentile)</span>
              <span className="text-xs font-normal text-slate-400 font-mono">200 Match Resamples</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Whiskers show the rank spread. Shorter range = higher certainty.
            </p>
          </div>

          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedRole('batters')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'batters' ? 'bg-pink-600 text-white shadow-glow-pink' : 'text-slate-400 hover:text-white'
              }`}
            >
              Batters Bootstrap
            </button>
            <button
              onClick={() => setSelectedRole('bowlers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'bowlers' ? 'bg-blue-600 text-white shadow-glow-blue' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bowlers Bootstrap
            </button>
          </div>
        </div>

        {/* Whisker Plot */}
        <div className="space-y-4">
          {/* Axis Header */}
          <div className="grid grid-cols-12 text-[11px] font-mono text-slate-500 border-b border-slate-800/80 pb-2">
            <div className="col-span-4 sm:col-span-3">Player (Final Rank)</div>
            <div className="col-span-8 sm:col-span-9 relative flex justify-between">
              <span>#1</span>
              <span>#10</span>
              <span>#20</span>
              <span>#30</span>
              <span>#40</span>
              <span>#50</span>
              <span>#60</span>
            </div>
          </div>

          {currentList.map((player) => {
            const minRank = player.bootstrapRange[0];
            const maxRank = player.bootstrapRange[1];
            const median = player.medianBootstrapRank;

            // Scale across 60 ranks
            const leftPct = (minRank / 60) * 100;
            const widthPct = Math.max(1.5, ((maxRank - minRank) / 60) * 100);
            const medianPct = (median / 60) * 100;
            const finalRankPct = (player.rank / 60) * 100;

            const isHighConfidence = player.bootstrapTop10Pct >= 70;

            return (
              <div key={player.name} className="grid grid-cols-12 items-center text-xs group">
                <div className="col-span-4 sm:col-span-3 pr-2">
                  <div className="font-semibold text-white group-hover:text-pink-400 transition-colors truncate">
                    #{player.rank} {player.name}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                    <span className={isHighConfidence ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {player.bootstrapTop10Pct}% top-10
                    </span>
                    <span>• [{minRank}–{maxRank}]</span>
                  </div>
                </div>

                <div className="col-span-8 sm:col-span-9 relative h-7 flex items-center">
                  {/* Grid reference ticks */}
                  <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                    <div className="border-r border-slate-700 h-full" />
                    <div className="border-r border-slate-700 h-full" />
                    <div className="border-r border-slate-700 h-full" />
                    <div className="border-r border-slate-700 h-full" />
                    <div className="border-r border-slate-700 h-full" />
                    <div className="border-r border-slate-700 h-full" />
                    <div className="border-r border-slate-700 h-full" />
                  </div>

                  {/* Range horizontal bar */}
                  <div
                    className={`absolute h-2.5 rounded-full ${
                      selectedRole === 'batters'
                        ? 'bg-gradient-to-r from-pink-500/70 to-purple-600/60'
                        : 'bg-gradient-to-r from-blue-500/70 to-indigo-600/60'
                    }`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    title={`Range: #${minRank} to #${maxRank}`}
                  />

                  {/* Median Marker (Circle) */}
                  <div
                    className="absolute w-3.5 h-3.5 rounded-full bg-pink-400 border border-white shadow-sm z-10"
                    style={{ left: `calc(${medianPct}% - 7px)` }}
                    title={`Median Bootstrap Rank: #${median}`}
                  />

                  {/* Final Model Rank Marker (Diamond) */}
                  <div
                    className="absolute w-2.5 h-2.5 rotate-45 bg-blue-300 border border-black z-20"
                    style={{ left: `calc(${finalRankPct}% - 5px)` }}
                    title={`Final Model Rank: #${player.rank}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-400 border border-white" />
            <span className="text-slate-300">Pink Dot = Median Bootstrap Rank</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rotate-45 bg-blue-300 border border-black" />
            <span className="text-slate-300">Blue Diamond = Final Model Rank</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-2 rounded-full bg-purple-600/60" />
            <span className="text-slate-300">Bar = 10th to 90th Percentile Range</span>
          </div>
        </div>
      </div>

      {/* Out of Sample Predictive Testing & Sensitivity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Out of sample testing */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Held-Out Temporal Testing
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Trained strictly on earlier matches; tested on future unseen seasons.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Role & Train Cut</th>
                  <th className="py-2.5 px-3">Tested</th>
                  <th className="py-2.5 px-3 text-right">Top 10 vs Rest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {TEMPORAL_VALIDATION.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-medium text-white">
                      {item.role} ({item.trainedOn})
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">
                      {item.testedOn} ({item.players} pl)
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                      {item.top10Score.toFixed(2)} vs {item.restScore.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-white">Validation verdict:</strong> The top 10 comfortably outperformed the rest in all 4 out-of-sample trials. The model captures genuine signal, not sample fitting.
          </div>
        </div>

        {/* Sensitivity Analysis Table */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-pink-400" />
              Top 10 Sensitivity Under Alternative Settings
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              How resilient is the Top 10 to varying parameters and thresholds?
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Alternative Setting</th>
                  <th className="py-2.5 px-3">Batters Overlap (ρ)</th>
                  <th className="py-2.5 px-3">Bowlers Overlap (ρ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {SENSITIVITY_TABLE.map((row) => (
                  <tr key={row.setting} className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-sans text-slate-300 font-medium">{row.setting}</td>
                    <td className="py-2 px-3 text-slate-200">
                      {row.battersOverlap} <span className="text-slate-500">(ρ {row.battersRho.toFixed(2)})</span>
                    </td>
                    <td className="py-2 px-3 text-slate-200">
                      {row.bowlersOverlap} <span className="text-slate-500">(ρ {row.bowlersRho.toFixed(2)})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-400">
            The list is remarkably stable to weights, delta components, and eligibility rules (7–10 of 10 retained).
          </p>
        </div>
      </div>
    </section>
  );
};
