import React from 'react';
import { ShieldCheck, Target, Activity, Award, Flame, Scale, ChevronRight } from 'lucide-react';

interface ExecutiveSummaryProps {
  onSelectPlayer: (name: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ onSelectPlayer, onNavigateTab }) => {
  return (
    <section className="mb-8 space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0C1427]/80 to-[#1A0B2E]/90 border border-slate-800 p-6 lg:p-8 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-pink-400" />
              <span>Rajasthan Royals Analytics | SupeRR Selector S2</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Who Actually Delivers When the <br />
              <span className="text-gradient-pink">Match is on the Line?</span>
            </h2>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-2xl">
              A win-probability-based ranking of IPL and T20I cricketers (2022–2026). 
              Every ball evaluated by its <strong className="text-pink-300">Leverage Index</strong>, judged against match state context, 
              and shrunk via Empirical Bayes to eliminate small-sample flukes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('rankings')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs tracking-wide shadow-glow-pink flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Top 10 Rankings</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateTab('rr-war-room')}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-xs tracking-wide flex items-center gap-2 transition-all hover:border-pink-500/50"
              >
                <ShieldCheck className="w-4 h-4 text-pink-400" />
                <span>Rajasthan Royals Auction Board</span>
              </button>
            </div>
          </div>

          {/* Top 2 Spotlights */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {/* Batter #1 Spotlight */}
            <div 
              onClick={() => onSelectPlayer('Suryakumar Yadav')}
              className="cursor-pointer group glass-panel rounded-xl p-4 border border-slate-700/60 hover:border-pink-500/50 transition-all hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> #1 Clutch Batter
                </span>
                <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono text-xs font-bold">
                  PPI 2.39
                </span>
              </div>
              <div className="font-display font-bold text-white text-base group-hover:text-pink-400 transition-colors">
                Suryakumar Yadav
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between mt-1">
                <span>SR: <strong className="text-emerald-400">175</strong> vs 141 exp (+34)</span>
                <span className="text-slate-500 font-mono text-[11px]">80% in Top 10</span>
              </div>
            </div>

            {/* Bowler #1 Spotlight */}
            <div 
              onClick={() => onSelectPlayer('Josh Hazlewood')}
              className="cursor-pointer group glass-panel rounded-xl p-4 border border-slate-700/60 hover:border-blue-500/50 transition-all hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> #1 Clutch Bowler
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs font-bold">
                  PPI 3.76
                </span>
              </div>
              <div className="font-display font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                Josh Hazlewood
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between mt-1">
                <span>Econ: <strong className="text-emerald-400">7.62</strong> (-1.45 saved)</span>
                <span className="text-slate-500 font-mono text-[11px]">90% in Top 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="glass-panel rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Usable Matches</span>
            <Activity className="w-3.5 h-3.5 text-pink-400" />
          </div>
          <div className="text-2xl font-display font-bold text-white">810</div>
          <div className="text-[11px] text-slate-500 mt-1">
            193,294 deliveries (2022-26)
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>WP Calibration</span>
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-display font-bold text-emerald-400">0.179</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Brier score (vs 0.250 baseline)
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>High-Pressure Cut</span>
            <Target className="w-3.5 h-3.5 text-pink-400" />
          </div>
          <div className="text-2xl font-display font-bold text-pink-400">Top 30%</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Leverage ≥ 0.0166 WP swing
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Ranked Cohort</span>
            <Award className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-display font-bold text-blue-400">305</div>
          <div className="text-[11px] text-slate-500 mt-1">
            151 batters & 154 bowlers
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Wicket Exchange Rate</span>
            <Scale className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-display font-bold text-amber-400">7.6 Runs</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Implied high-pressure value
          </div>
        </div>
      </div>

      {/* The 5 Key Principles from Page 1 */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          The Five Analytical Foundations (Methodology Overview)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/30 transition-colors">
            <div className="font-semibold text-xs text-pink-300 mb-1">1. Pressure Measured</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every delivery gets a Leverage Index: how far the next ball swings win probability. Top 30% leverage defined as clutch.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/30 transition-colors">
            <div className="font-semibold text-xs text-blue-300 mb-1">2. Judged vs Context</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Evaluated on Win Probability Added above expectation. Removes credit for merely batting on the stronger side.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/30 transition-colors">
            <div className="font-semibold text-xs text-amber-300 mb-1">3. Five Blended Signals</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Impact (30%), Net Runs (25%), Lev-Rate (20%), Consistency (15%), and Rise vs Usual (10%), shrunk toward the mean.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/30 transition-colors">
            <div className="font-semibold text-xs text-emerald-300 mb-1">4. Honest About Noise</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              T20 pressure samples are inherently noisy. 200 match-level bootstrap resamples provide robust confidence intervals.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/30 transition-colors">
            <div className="font-semibold text-xs text-purple-300 mb-1">5. Supplied Data Only</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              810 matches, 193k balls. 5-fold grouped out-of-fold calibration ensures models never train on test fixtures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
