import React from 'react';
import { X, Shield, Activity } from 'lucide-react';
import { TOP_BATTERS, TOP_BOWLERS } from '../data/ppiData';

interface PlayerModalProps {
  playerName: string | null;
  onClose: () => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ playerName, onClose }) => {
  if (!playerName) return null;

  const batter = TOP_BATTERS.find(b => b.name === playerName);
  const bowler = TOP_BOWLERS.find(b => b.name === playerName);

  if (!batter && !bowler) return null;

  const isBatter = Boolean(batter);
  const player = (batter || bowler)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Player Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isBatter ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {isBatter ? `Rank #${batter?.rank} Batter` : `Rank #${bowler?.rank} Bowler`}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {isBatter ? batter?.archetype : bowler?.bowlingType}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              {player.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {player.teamContext} • {player.matches} matches • {player.pressureBalls} pressure deliveries evaluated
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pressure-Proof Score</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-display font-extrabold ${isBatter ? 'text-pink-400' : 'text-blue-400'}`}>
                {player.ppi.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 4.00</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono">
              {player.bootstrapTop10Pct}% in Top 10 Bootstraps
            </div>
          </div>
        </div>

        {/* Rajasthan Royals Strategic Fit Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/20 to-blue-950/40 border border-pink-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-pink-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-pink-300">
              Rajasthan Royals War Room Analysis: {player.rrStrategy.category}
            </h3>
            <span className="ml-auto px-2 py-0.5 rounded text-[11px] font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/40">
              {player.rrStrategy.verdict}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {player.rrStrategy.rationale}
          </p>
        </div>

        {/* Core Metric Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {batter ? (
            <>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-1">Pressure Strike Rate</div>
                <div className="text-xl font-bold font-mono text-white flex items-baseline gap-1.5">
                  <span>{batter.srPressure}</span>
                  <span className="text-xs text-slate-500">exp {batter.srExpected}</span>
                </div>
                <div className="text-xs text-emerald-400 mt-1 font-semibold">
                  +{batter.srDiff} SR advantage under pressure
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-1">Dismissals per 100 Balls</div>
                <div className="text-xl font-bold font-mono text-white flex items-baseline gap-1.5">
                  <span>{batter.dismissalsPer100Actual}</span>
                  <span className="text-xs text-slate-500">exp {batter.dismissalsPer100Expected}</span>
                </div>
                <div className="text-xs text-emerald-400 mt-1 font-semibold">
                  {(batter.dismissalsPer100Expected - batter.dismissalsPer100Actual).toFixed(1)} fewer dismissals/100
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-1">Positive Innings Share</div>
                <div className="text-xl font-bold font-mono text-white">
                  {batter.pressureInningsPositivePct}%
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Beta-shrunk win rate across games
                </div>
              </div>
            </>
          ) : bowler ? (
            <>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-1">Pressure Economy Rate</div>
                <div className="text-xl font-bold font-mono text-white flex items-baseline gap-1.5">
                  <span>{bowler.economyPressure.toFixed(2)}</span>
                  <span className="text-xs text-slate-500">exp {bowler.economyExpected.toFixed(2)}</span>
                </div>
                <div className={`text-xs mt-1 font-semibold ${bowler.economySaved > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {bowler.economySaved > 0 ? `-${bowler.economySaved.toFixed(2)} RPO saved` : `+${Math.abs(bowler.economySaved).toFixed(2)} vs exp`}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-1">Wickets per 100 Balls</div>
                <div className="text-xl font-bold font-mono text-white flex items-baseline gap-1.5">
                  <span>{bowler.wicketsPer100Actual}</span>
                  <span className="text-xs text-slate-500">exp {bowler.wicketsPer100Expected}</span>
                </div>
                <div className="text-xs text-emerald-400 mt-1 font-semibold">
                  {bowler.wicketsPer100Actual > bowler.wicketsPer100Expected ? `+${(bowler.wicketsPer100Actual - bowler.wicketsPer100Expected).toFixed(1)} strike edge` : 'Economy anchor'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-1">Positive Spells Share</div>
                <div className="text-xl font-bold font-mono text-white">
                  {bowler.pressureSpellsPositivePct}%
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Spells adding win probability
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* 5-Signal Decomposition */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>5-Signal Rating Decomposition</span>
            <span className="text-slate-500 text-[10px]">Standardized & Shrunk</span>
          </h4>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Pressure Impact (30% weight)</span>
                <span className="font-mono font-semibold">{player.signals.pressureImpact} / 100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-pink-500 h-full rounded-full" style={{ width: `${player.signals.pressureImpact}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Pressure Net Runs (25% weight)</span>
                <span className="font-mono font-semibold">{player.signals.netRuns} / 100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${player.signals.netRuns}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Leverage-Weighted Rate (20% weight)</span>
                <span className="font-mono font-semibold">{player.signals.leverageWeightedRate} / 100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${player.signals.leverageWeightedRate}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Consistency Across Spells (15% weight)</span>
                <span className="font-mono font-semibold">{player.signals.consistency} / 100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${player.signals.consistency}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Rise vs Usual Performance (10% weight)</span>
                <span className="font-mono font-semibold">{player.signals.riseVsUsual} / 100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${player.signals.riseVsUsual}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bootstrap Uncertainty Interval (Whisker Visual) */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              Bootstrap Rank Distribution (200 Resamples of Matches)
            </span>
            <span className="font-mono text-slate-400 text-[11px]">
              Median Rank: #{player.medianBootstrapRank}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            10th to 90th percentile rank spread shows honest estimation uncertainty in T20 pressure samples:
          </p>

          <div className="relative pt-6 pb-2">
            <div className="h-2 w-full bg-slate-800 rounded-full relative">
              {/* Range bar */}
              <div 
                className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full opacity-70"
                style={{
                  left: `${(player.bootstrapRange[0] / 60) * 100}%`,
                  width: `${((player.bootstrapRange[1] - player.bootstrapRange[0]) / 60) * 100}%`
                }}
              />
              {/* Median dot */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-pink-500 shadow-md"
                style={{ left: `calc(${(player.medianBootstrapRank / 60) * 100}% - 8px)` }}
                title={`Median: Rank #${player.medianBootstrapRank}`}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
              <span>Rank #1</span>
              <span>10th Pct: #{player.bootstrapRange[0]}</span>
              <span className="text-white font-bold">Median: #{player.medianBootstrapRank}</span>
              <span>90th Pct: #{player.bootstrapRange[1]}</span>
              <span>Rank #60</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
