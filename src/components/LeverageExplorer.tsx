import React, { useState } from 'react';
import { Cpu, Flame, Info, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from 'recharts';
import { CHASE_HEATMAP_DATA, OVER_LEVERAGE_DATA, PRESSURE_TIERS } from '../data/ppiData';

export const LeverageExplorer: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{ rrr: string; balls: string; value: number } | null>({
    rrr: '10-12',
    balls: '1-12',
    value: 13.6
  });

  const getHeatmapColor = (value: number) => {
    if (value >= 12.0) return 'bg-pink-600 text-white font-bold shadow-lg shadow-pink-600/30';
    if (value >= 9.0) return 'bg-pink-700/90 text-white font-semibold';
    if (value >= 5.0) return 'bg-rose-900/80 text-rose-100 font-medium';
    if (value >= 3.0) return 'bg-purple-950/70 text-purple-200';
    if (value >= 1.5) return 'bg-slate-800/80 text-slate-300';
    return 'bg-slate-900/60 text-slate-500';
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-3">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span>Mathematical Framework</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">
          How Pressure is Defined: The Leverage Index (LI)
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
          Rather than arbitrarily picking thresholds for run rate and overs, the model synthesizes all match dimensions into a single rigorous quantity: 
          <strong className="text-pink-300"> Leverage</strong> — the probability-weighted absolute swing in win probability caused by the next delivery across all potential outcomes.
        </p>
      </div>

      {/* 3 Tiers Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESSURE_TIERS.map((tier, idx) => (
          <div
            key={tier.tier}
            className={`p-5 rounded-2xl glass-panel border transition-all ${
              idx === 0
                ? 'border-pink-500/50 bg-gradient-to-b from-pink-950/20 to-slate-900/80 shadow-glow-pink'
                : idx === 1
                ? 'border-blue-500/30 bg-gradient-to-b from-blue-950/20 to-slate-900/80'
                : 'border-slate-800 bg-slate-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                idx === 0 ? 'bg-pink-500/20 text-pink-300' : idx === 1 ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {tier.tier}
              </span>
              <span className="font-mono text-xs font-semibold text-slate-400">
                {tier.share} of all deliveries
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono mb-3">
              Rule: <strong className="text-white">{tier.rule}</strong>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {tier.description}
            </p>

            <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Mean Leverage:</span>
                <span className="font-mono font-bold text-white">{tier.meanLeverage} WP pts/ball</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Distance from 50% WP:</span>
                <span className="font-mono text-slate-300">{tier.distFrom50} (Closer = tighter)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">2nd Innings Share:</span>
                <span className="font-mono text-slate-300">{tier.secondInningsShare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Death Overs Share:</span>
                <span className="font-mono text-slate-300">{tier.deathOversShare}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chase Pressure Heatmap & Over-by-Over Curve Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chase Heatmap */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-pink-400" />
                Chase Pressure Heatmap (RRR × Balls Left)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Expected Win Probability swing (in percentage points) on the next ball.
              </p>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto pt-2">
            <div className="min-w-[420px]">
              {/* Column Headers: Balls Left */}
              <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono font-semibold text-slate-400 mb-2">
                <div className="text-left text-slate-500">RRR \ Balls</div>
                <div>1–12</div>
                <div>13–24</div>
                <div>25–36</div>
                <div>37–48</div>
                <div>49–60</div>
              </div>

              {/* Rows */}
              <div className="space-y-2">
                {CHASE_HEATMAP_DATA.map((row) => (
                  <div key={row.rrrLabel} className="grid grid-cols-6 gap-2 items-center text-xs">
                    <div className="font-mono font-semibold text-slate-300 text-left pl-1">
                      {row.rrrLabel}
                    </div>

                    {[
                      { balls: '1-12', val: row.b1_12 },
                      { balls: '13-24', val: row.b13_24 },
                      { balls: '25-36', val: row.b25_36 },
                      { balls: '37-48', val: row.b37_48 },
                      { balls: '49-60', val: row.b49_60 },
                    ].map(({ balls, val }) => (
                      <button
                        key={balls}
                        onClick={() => setSelectedCell({ rrr: row.rrrLabel, balls, value: val })}
                        className={`h-10 rounded-xl flex items-center justify-center font-mono text-xs transition-all hover:scale-105 active:scale-95 ${getHeatmapColor(
                          val
                        )} ${
                          selectedCell?.rrr === row.rrrLabel && selectedCell?.balls === balls
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-[#070B19]'
                            : ''
                        }`}
                      >
                        {val.toFixed(1)}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Heatmap Insights Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-pink-300 font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Critical Methodological Insight: "Close & Late" vs "Hard"</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Notice how leverage peaks at <strong className="text-white">13.6 points</strong> when 1–12 balls remain with a required rate of 10–12. 
              However, when RRR climbs to <strong className="text-white">14+</strong>, leverage collapses down to <strong className="text-rose-400">2.9 points</strong>! 
              Why? Because at 14+ with only 12 balls, the match is statistically decided (loss virtually certain). 
              Leverage measures contests that are actively swingable, not merely impossible!
            </p>
          </div>
        </div>

        {/* Over by Over Progression Curve */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Leverage Progression by Over
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Average leverage (WP points per ball) across overs 1 to 20.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={OVER_LEVERAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="over" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[0, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '11px'
                  }}
                  formatter={(val: any) => [`${val} WP pts`, '']}
                />
                <ReferenceLine y={1.66} stroke="#EA1B75" strokeDasharray="4 4" label={{ value: 'Top 30% Cutoff (1.66)', fill: '#EA1B75', fontSize: 10, position: 'insideTopLeft' }} />
                <Line type="monotone" dataKey="inn2" stroke="#EA1B75" strokeWidth={2.5} dot={false} name="Innings 2 (Chases)" />
                <Line type="monotone" dataKey="inn1" stroke="#3B82F6" strokeWidth={2} dot={false} name="Innings 1 (Setting)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-pink-500 rounded-full" />
              <span className="text-slate-300">2nd Innings (Target pressure)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-blue-500 rounded-full" />
              <span className="text-slate-300">1st Innings (Setting)</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 leading-relaxed">
            Leverage rises steadily throughout the middle overs and explodes after over 16. Chases have significantly higher leverage because an exact target anchors the win probability denominator.
          </p>
        </div>
      </div>
    </section>
  );
};
