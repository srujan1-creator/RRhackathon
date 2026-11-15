import React, { useState } from 'react';
import { Search, Flame, Award, ChevronRight, Zap } from 'lucide-react';
import { TOP_BATTERS, TOP_BOWLERS } from '../data/ppiData';

interface RankingsSectionProps {
  onSelectPlayer: (name: string) => void;
}

export const RankingsSection: React.FC<RankingsSectionProps> = ({ onSelectPlayer }) => {
  const [activeCategory, setActiveCategory] = useState<'batters' | 'bowlers'>('batters');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArchetype, setFilterArchetype] = useState<string>('all');

  const filteredBatters = TOP_BATTERS.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.teamContext.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchetype = filterArchetype === 'all' || b.archetype === filterArchetype;
    return matchesSearch && matchesArchetype;
  });

  const filteredBowlers = TOP_BOWLERS.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.teamContext.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.bowlingType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchetype = filterArchetype === 'all' || b.role === filterArchetype;
    return matchesSearch && matchesArchetype;
  });

  return (
    <section className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-display font-bold text-white tracking-tight">
              Pressure-Proof Index (PPI) Leaderboards
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              Top 10 Final Rankings
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized multi-signal index combining Pressure Impact, Net Runs, Leverage Rate, Consistency, and Rise vs Usual.
          </p>
        </div>

        {/* View Switcher & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Toggle */}
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => { setActiveCategory('batters'); setFilterArchetype('all'); }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === 'batters'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-glow-pink'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Batters Top 10</span>
            </button>
            <button
              onClick={() => { setActiveCategory('bowlers'); setFilterArchetype('all'); }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === 'bowlers'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Bowlers Top 10</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search player, team, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500/60 w-48 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Main Table View */}
      {activeCategory === 'batters' ? (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                  <th className="py-3.5 px-4">Player & Archetype</th>
                  <th className="py-3.5 px-4">Pressure Balls / Matches</th>
                  <th className="py-3.5 px-4">Strike Rate (Actual vs Exp)</th>
                  <th className="py-3.5 px-4">Dismissals / 100b</th>
                  <th className="py-3.5 px-4">Positive Innings %</th>
                  <th className="py-3.5 px-4">PPI Rating</th>
                  <th className="py-3.5 px-4">Top-10 Robustness</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBatters.map((batter) => {
                  return (
                    <tr
                      key={batter.name}
                      onClick={() => onSelectPlayer(batter.name)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      {/* Rank with Medal */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-mono font-bold text-xs ${
                          batter.rank === 1
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm shadow-amber-400/20'
                            : batter.rank === 2
                            ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40'
                            : batter.rank === 3
                            ? 'bg-amber-600/20 text-amber-400 border border-amber-600/40'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}>
                          {batter.rank}
                        </span>
                      </td>

                      {/* Player Name and Role */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div>
                            <div className="font-semibold text-white group-hover:text-pink-400 transition-colors flex items-center gap-1.5">
                              {batter.name}
                              {batter.name.includes('Vaibhav') && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                                  RR Asset
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{batter.role}</span>
                              <span className="text-slate-600">•</span>
                              <span className="text-slate-500">{batter.teamContext}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Pressure Sample */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-slate-200">
                          <strong>{batter.pressureBalls}</strong> <span className="text-slate-500">balls</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {batter.matches} matches ({batter.highPressurePhaseShare})
                        </div>
                      </td>

                      {/* Strike Rate */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-sm">
                            {batter.srPressure}
                          </span>
                          <span className="text-slate-500 text-[11px]">vs {batter.srExpected}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            batter.srDiff >= 30 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                          }`}>
                            +{batter.srDiff}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Usual delta: +{batter.srUsualDiff} pts
                        </div>
                      </td>

                      {/* Dismissals */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-medium text-slate-200">
                            {batter.dismissalsPer100Actual}
                          </span>
                          <span className="text-slate-500 text-[11px]">vs {batter.dismissalsPer100Expected} exp</span>
                        </div>
                        <div className="text-[10px] text-emerald-400">
                          {(batter.dismissalsPer100Expected - batter.dismissalsPer100Actual).toFixed(1)} fewer dismissals/100
                        </div>
                      </td>

                      {/* Positive Innings % */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-rose-400 h-full rounded-full"
                              style={{ width: `${batter.pressureInningsPositivePct}%` }}
                            />
                          </div>
                          <span className="font-mono font-semibold text-slate-200">
                            {batter.pressureInningsPositivePct}%
                          </span>
                        </div>
                      </td>

                      {/* PPI Score */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500/15 border border-pink-500/30">
                          <Award className="w-3.5 h-3.5 text-pink-400" />
                          <span className="font-mono font-bold text-pink-300 text-sm">
                            {batter.ppi.toFixed(2)}
                          </span>
                        </div>
                      </td>

                      {/* Top-10 Bootstrap Robustness */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                batter.bootstrapTop10Pct >= 70 ? 'bg-emerald-400' : batter.bootstrapTop10Pct >= 50 ? 'bg-amber-400' : 'bg-slate-400'
                              }`}
                              style={{ width: `${batter.bootstrapTop10Pct}%` }}
                            />
                          </div>
                          <span className="font-mono text-slate-200 font-medium">
                            {batter.bootstrapTop10Pct}%
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          10th-90th: [{batter.bootstrapRange[0]}-{batter.bootstrapRange[1]}]
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectPlayer(batter.name); }}
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-pink-600 text-slate-400 hover:text-white transition-all"
                          title="View Player Profile"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                  <th className="py-3.5 px-4">Bowler & Specialty</th>
                  <th className="py-3.5 px-4">Pressure Balls / Matches</th>
                  <th className="py-3.5 px-4">Economy (Actual vs Exp)</th>
                  <th className="py-3.5 px-4">Wickets / 100b</th>
                  <th className="py-3.5 px-4">Positive Spells %</th>
                  <th className="py-3.5 px-4">PPI Rating</th>
                  <th className="py-3.5 px-4">Top-10 Robustness</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBowlers.map((bowler) => {
                  return (
                    <tr
                      key={bowler.name}
                      onClick={() => onSelectPlayer(bowler.name)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-mono font-bold text-xs ${
                          bowler.rank === 1
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm shadow-amber-400/20'
                            : bowler.rank === 2
                            ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40'
                            : bowler.rank === 3
                            ? 'bg-amber-600/20 text-amber-400 border border-amber-600/40'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}>
                          {bowler.rank}
                        </span>
                      </td>

                      {/* Bowler Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div>
                            <div className="font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                              {bowler.name}
                              {bowler.rank === 1 && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                                  Benchmark #1
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                                {bowler.bowlingType}
                              </span>
                              <span className="text-slate-600">•</span>
                              <span className="text-slate-400">{bowler.role}</span>
                              <span className="text-slate-600">•</span>
                              <span className="text-slate-500">{bowler.teamContext}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Pressure Sample */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-slate-200">
                          <strong>{bowler.pressureBalls}</strong> <span className="text-slate-500">balls</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {bowler.matches} matches ({bowler.highPressurePhaseShare})
                        </div>
                      </td>

                      {/* Economy */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-sm">
                            {bowler.economyPressure.toFixed(2)}
                          </span>
                          <span className="text-slate-500 text-[11px]">vs {bowler.economyExpected.toFixed(2)} exp</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            bowler.economySaved > 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {bowler.economySaved > 0 ? `-${bowler.economySaved.toFixed(2)} RPO` : `+${Math.abs(bowler.economySaved).toFixed(2)}`}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Usual saved: {bowler.economyUsualSaved > 0 ? `-${bowler.economyUsualSaved.toFixed(2)}` : bowler.economyUsualSaved.toFixed(2)} RPO
                        </div>
                      </td>

                      {/* Wickets */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-semibold text-slate-200">
                            {bowler.wicketsPer100Actual}
                          </span>
                          <span className="text-slate-500 text-[11px]">vs {bowler.wicketsPer100Expected} exp</span>
                        </div>
                        <div className="text-[10px] text-emerald-400">
                          {bowler.wicketsPer100Actual > bowler.wicketsPer100Expected 
                            ? `+${(bowler.wicketsPer100Actual - bowler.wicketsPer100Expected).toFixed(1)} wkts/100` 
                            : `${(bowler.wicketsPer100Actual - bowler.wicketsPer100Expected).toFixed(1)} wkts/100`}
                        </div>
                      </td>

                      {/* Positive Spells */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full rounded-full"
                              style={{ width: `${bowler.pressureSpellsPositivePct}%` }}
                            />
                          </div>
                          <span className="font-mono font-semibold text-slate-200">
                            {bowler.pressureSpellsPositivePct}%
                          </span>
                        </div>
                      </td>

                      {/* PPI Score */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30">
                          <Award className="w-3.5 h-3.5 text-blue-400" />
                          <span className="font-mono font-bold text-blue-300 text-sm">
                            {bowler.ppi.toFixed(2)}
                          </span>
                        </div>
                      </td>

                      {/* Bootstrap Robustness */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                bowler.bootstrapTop10Pct >= 70 ? 'bg-emerald-400' : bowler.bootstrapTop10Pct >= 50 ? 'bg-blue-400' : 'bg-slate-400'
                              }`}
                              style={{ width: `${bowler.bootstrapTop10Pct}%` }}
                            />
                          </div>
                          <span className="font-mono text-slate-200 font-medium">
                            {bowler.bootstrapTop10Pct}%
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          10th-90th: [{bowler.bootstrapRange[0]}-{bowler.bootstrapRange[1]}]
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectPlayer(bowler.name); }}
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-blue-600 text-slate-400 hover:text-white transition-all"
                          title="View Player Profile"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
