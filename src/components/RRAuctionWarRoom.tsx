import React, { useState } from 'react';
import { Shield, Target, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RR_STRATEGY_MATRIX, TOP_BATTERS, TOP_BOWLERS } from '../data/ppiData';

export const RRAuctionWarRoom: React.FC = () => {
  // Pre-configured default RR Dream Core lineup based on the paper's explicit recommendations
  const [selectedSquad, setSelectedSquad] = useState<{ [roleSlot: string]: string }>({
    'Powerplay Opener': 'Vaibhav Sooryavanshi',
    'Wicketkeeper Opener': 'Phil Salt',
    'Crisis Anchor': 'Shreyas Iyer',
    'Middle-Order Engine': 'Cameron Green',
    'Death Finisher': 'Tim David',
    'Young Indian Finisher': 'Naman Dhir',
    'Middle Overs Mystery': 'Varun Chakravarthy',
    'Scouting Gem Spinner': 'Sufiyan Muqeem',
    'Pace Anchor': 'Josh Hazlewood',
    'Death Specialist': 'Matheesha Pathirana',
    'Dual-Phase Pacer': 'Taskin Ahmed',
  });

  const slots = [
    { id: 'Powerplay Opener', pool: ['Vaibhav Sooryavanshi', 'Phil Salt'], type: 'bat' },
    { id: 'Wicketkeeper Opener', pool: ['Phil Salt', 'Vaibhav Sooryavanshi'], type: 'bat' },
    { id: 'Crisis Anchor', pool: ['Shreyas Iyer', 'Suryakumar Yadav', 'Namboori Tilak Varma'], type: 'bat' },
    { id: 'Middle-Order Engine', pool: ['Cameron Green', 'Daryl Mitchell', 'Namboori Tilak Varma'], type: 'bat' },
    { id: 'Death Finisher', pool: ['Tim David', 'Naman Dhir'], type: 'bat' },
    { id: 'Young Indian Finisher', pool: ['Naman Dhir', 'Tim David'], type: 'bat' },
    { id: 'Middle Overs Mystery', pool: ['Varun Chakravarthy', 'Rashid Khan', 'Krunal Pandya'], type: 'bowl' },
    { id: 'Scouting Gem Spinner', pool: ['Sufiyan Muqeem', 'Sunil Narine', 'Krunal Pandya'], type: 'bowl' },
    { id: 'Pace Anchor', pool: ['Josh Hazlewood', 'Jasprit Bumrah', 'Kagiso Rabada'], type: 'bowl' },
    { id: 'Death Specialist', pool: ['Matheesha Pathirana', 'Jasprit Bumrah', 'Taskin Ahmed'], type: 'bowl' },
    { id: 'Dual-Phase Pacer', pool: ['Taskin Ahmed', 'Kagiso Rabada', 'Josh Hazlewood'], type: 'bowl' },
  ];

  // Calculate squad average PPI
  const squadNames = Object.values(selectedSquad);
  const batterStats = TOP_BATTERS.filter(b => squadNames.includes(b.name));
  const bowlerStats = TOP_BOWLERS.filter(b => squadNames.includes(b.name));

  const totalScore = [...batterStats.map(b => b.ppi), ...bowlerStats.map(b => b.ppi)];
  const avgPPI = totalScore.length > 0 ? (totalScore.reduce((a, b) => a + b, 0) / totalScore.length).toFixed(2) : '0.00';

  const overseasPlayers = squadNames.filter(name => {
    const b = TOP_BATTERS.find(x => x.name === name);
    const bo = TOP_BOWLERS.find(x => x.name === name);
    const ctx = (b?.teamContext || bo?.teamContext || '');
    return !ctx.includes('India');
  });

  const handleSelectSlot = (slotId: string, playerName: string) => {
    setSelectedSquad(prev => ({ ...prev, [slotId]: playerName }));
  };

  const handleOptimizeSquad = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-950/70 via-slate-900/90 to-blue-950/70 border border-pink-500/30 p-6 lg:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-pink-400" />
              <span>Rajasthan Royals War Room Strategy</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-display font-extrabold text-white tracking-tight">
              Actionable Franchise Blueprint for the Auction
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Applying the Pressure-Proof Index to RR's roster needs. Moving from noisy aggregate averages to 
              empirical, context-adjusted clutch delivery in playoff and death-overs scenarios.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-pink-500/30 flex items-center gap-4">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Configured Core PPI</div>
              <div className="text-3xl font-display font-extrabold text-pink-400">{avgPPI}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Overseas: <strong className={overseasPlayers.length <= 4 ? 'text-emerald-400' : 'text-rose-400'}>{overseasPlayers.length}/4 (IPL rule)</strong>
              </div>
            </div>
            <button
              onClick={handleOptimizeSquad}
              className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs shadow-glow-pink transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Validate Squad</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Franchise Needs Matrix */}
      <div className="space-y-4">
        <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-pink-400" />
          <span>The Five Franchise Gaps & Best-Evidenced Solutions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RR_STRATEGY_MATRIX.map((item, idx) => (
            <div
              key={item.need}
              className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-pink-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                    Need #{idx + 1}
                  </span>
                  <span className="text-[11px] text-pink-400 font-semibold">Priority</span>
                </div>
                <h4 className="font-display font-bold text-white text-sm capitalize">
                  {item.need}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.why}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="text-xs text-slate-300 font-semibold">Recommended Targets:</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.options.map(opt => (
                    <span
                      key={opt}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-700/80 text-pink-300 font-medium"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-emerald-400/90 leading-normal pt-1">
                  <strong>Plan:</strong> {item.actionPlan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Squad Builder */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Rajasthan Royals Pressure-Proof Core XI Configuration</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize each tactical slot using the top-ranked clutch performers from the study.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            11 Strategic Match Roles
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {slots.map((slot) => {
            const currentSelected = selectedSquad[slot.id];
            return (
              <div key={slot.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {slot.id}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${slot.type === 'bat' ? 'bg-pink-500/15 text-pink-300' : 'bg-blue-500/15 text-blue-300'}`}>
                    {slot.type === 'bat' ? 'Batting' : 'Bowling'}
                  </span>
                </div>

                <select
                  value={currentSelected}
                  onChange={(e) => handleSelectSlot(slot.id, e.target.value)}
                  className="w-full bg-[#070B19] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-pink-500"
                >
                  {slot.pool.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>

                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Active choice:</span>
                  <span className="font-semibold text-slate-200">{currentSelected}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retain vs Auction Recommendation Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-gradient-to-r from-pink-950/30 to-purple-950/20 border border-pink-500/30 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-pink-300">
                Retention Priority: Vaibhav Sooryavanshi
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Already listed in RR systems. Powerplay strike rate of <strong className="text-white">237</strong> against 150 expected (+87 edge). 
              Given high auction variance (bootstrap ranks #1 to #16), retaining and developing him internally yields immense economic surplus.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/30 to-slate-900 border border-blue-500/30 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Hidden Gem Target: Sufiyan Muqeem
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Left-arm wrist spinner with an unprecedented <strong className="text-white">5.08 pressure economy</strong> (saving 2.55 RPO in middle overs). 
              A compact 156-ball sample means low open-market hype—an optimal high-upside scouting coup.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
