import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';
import { FIVE_SIGNALS_INFO } from '../data/ppiData';

export const MethodologyReport: React.FC = () => {
  return (
    <section className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-pink-400" />
          <span>Technical Whitepaper & Documentation</span>
        </div>
        <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">
          Pressure-Proof Index (PPI) Methodology Report
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          SupeRR Selector Season 2 | Round 1 Submission. 
          A mathematically validated framework designed to quantify cricket performance under clutch high-leverage conditions in T20 cricket (2022–2026).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Completed Matches</span>
            <span className="font-mono font-bold text-white text-base">810</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Deliveries Evaluated</span>
            <span className="font-mono font-bold text-white text-base">193,294</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Brier Calibration</span>
            <span className="font-mono font-bold text-emerald-400 text-base">0.179 (vs 0.250)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Wicket Exchange</span>
            <span className="font-mono font-bold text-pink-400 text-base">7.6 Runs / Wicket</span>
          </div>
        </div>
      </div>

      {/* 1. How Pressure is Defined */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <span className="text-pink-500">1.</span> How Pressure is Defined
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The brief states that pressure may depend on required run rate, wickets in hand, balls remaining, the stage of an innings, and how close the contest is. 
          Rather than hand-picking arbitrary thresholds for each, the model lets one single mathematical quantity carry all of them: 
          <strong className="text-pink-300"> leverage</strong>, the expected size of the swing in win probability on the next ball.
        </p>

        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Step A: Win-Probability (WP) Model</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Two gradient-boosted models, one for each innings. First innings features: balls left, wickets in hand, runs scored, league vs international. 
              Chase features: balls left, wickets in hand, runs needed, required run rate, league vs international. 
              Monotonic constraints enforce domain sanity (more wickets never lowers WP, higher RRR never raises WP). 
              Out-of-sample Brier score is <strong className="text-white">0.179</strong> (vs 0.250 no-info baseline) and log-loss is <strong className="text-white">0.526</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Step B: Leverage on Every Ball</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              A second model estimates the probability of each next-ball outcome (dot, 1, 2, 3, 4, 6+, wicket, wide, no-ball) conditioned on match state, bowler type (pace or spin), and batter hand. 
              Leverage is the probability-weighted absolute change in WP across outcomes. A ball where a six or wicket swings the match by 8 points has high leverage; a ball in a settled game has nearly zero.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Step C: Three Discrete Tiers</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Balls are grouped into <strong className="text-pink-300">High Pressure</strong> (top 30% of leverage, ≥ 0.0166), 
              <strong className="text-blue-300"> Elevated</strong> (median to top 30%), and 
              <strong className="text-slate-300"> Ordinary</strong> (bottom 50%, ≤ 0.0106). 
              In high pressure, mean leverage is 3.17 WP points per ball and average distance from 50% is only 0.16.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Five Signals */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <span className="text-pink-500">2.</span> Five Evaluative Signals per Player
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ball value is calculated as <strong className="text-pink-300">Win Probability Added above expectation</strong>. A batter receives the value; a bowler receives the negative. Wides count against the bowler only; byes and leg-byes are neutral.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {FIVE_SIGNALS_INFO.map(s => (
            <div key={s.name} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{s.name}</span>
                <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono text-xs font-bold">
                  Weight: {s.weight}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{s.detail}</p>
              <div className="text-[10px] text-slate-500 font-mono pt-1">
                Split-half reliability: Batters {s.batterReliability} | Bowlers {s.bowlerReliability}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Fair Comparisons */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <span className="text-pink-500">3.</span> Fair Comparisons & Data Hygiene
        </h3>
        <ul className="space-y-2.5 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Strict Eligibility:</strong> At least 100 high-pressure balls and at least 15 matches with pressure involvement, plus an ordinary baseline. Yields 151 qualified batters and 154 bowlers.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Role-Conditioned Expectation:</strong> Every expectation is conditioned on over, wickets, required rate, balls remaining, bowler type, and batter hand. Death bowlers are not penalized for bowling in high-scoring overs.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Associate Nation Down-Weighting:</strong> Matches involving associate nations or "A" teams receive 0.5 weight to avoid inflating ratings against weaker bowling attacks.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Rain & DLS Clean-up:</strong> Abandoned, no-result, tied, and DLS rain-shortened fixtures are removed (883 matches reduced to 810 fully usable games).</span>
          </li>
        </ul>
      </div>

      {/* 4. Limitations & Reproducibility */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <span className="text-pink-500">4.</span> Limitations & Ethical Honesty
        </h3>
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong className="text-amber-300">Signal is inherently weak:</strong> Split-half reliabilities between 0.05 and 0.18 mean individual pressure ratings carry large uncertainty. The lists are best used as an evidence-ranked shortlist, not an unbending final verdict.
          </p>
          <p>
            <strong className="text-amber-300">Unmodelled Factors:</strong> Opposition bowler quality, boundary dimensions, dew, pitch deterioration, and fielding ratings were not present in the ball-by-ball feed and must be supplemented by scouts.
          </p>
        </div>
      </div>
    </section>
  );
};
