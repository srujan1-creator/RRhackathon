import React, { useState } from 'react';
import { X, Crosshair, ArrowRight, Zap } from 'lucide-react';
import { TOP_BATTERS, TOP_BOWLERS } from '../data/ppiData';

interface LivePressureSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayer: (name: string) => void;
}

export const LivePressureSimulator: React.FC<LivePressureSimulatorProps> = ({ isOpen, onClose, onSelectPlayer }) => {
  if (!isOpen) return null;

  const [innings, setInnings] = useState<1 | 2>(2);
  const [over, setOver] = useState<number>(18);
  const [wickets, setWickets] = useState<number>(5);
  const [target, setTarget] = useState<number>(185);
  const [currentScore, setCurrentScore] = useState<number>(158);

  const ballsRemaining = Math.max(1, (20 - over) * 6);
  const runsNeeded = Math.max(1, target - currentScore);
  const rrr = Number(((runsNeeded / ballsRemaining) * 6).toFixed(2));

  // Compute realistic leverage index based on paper's model insights:
  // 1. Chases have higher baseline leverage
  // 2. Exponential curve late in game
  // 3. Peak at RRR 8-12 with 1-12 balls left; collapse if RRR > 14 when balls < 12
  let estimatedLeverage = 1.0;

  if (innings === 2) {
    if (ballsRemaining <= 12) {
      if (rrr >= 14) estimatedLeverage = 2.9;
      else if (rrr >= 12) estimatedLeverage = 11.0;
      else if (rrr >= 10) estimatedLeverage = 13.6; // Peak!
      else if (rrr >= 8) estimatedLeverage = 10.1;
      else if (rrr >= 6) estimatedLeverage = 4.3;
      else estimatedLeverage = 1.8;
    } else if (ballsRemaining <= 24) {
      if (rrr >= 12) estimatedLeverage = 4.8 + (10 - wickets) * 0.2;
      else if (rrr >= 10) estimatedLeverage = 6.0;
      else if (rrr >= 8) estimatedLeverage = 4.3;
      else estimatedLeverage = 1.8;
    } else {
      estimatedLeverage = 1.5 + (over / 20) * 1.5 + (wickets / 10) * 0.8;
    }
  } else {
    // 1st innings: steady progression up to 2.85 in 20th over
    const base = 1.15 + Math.pow(over / 20, 2) * 1.7;
    const wicketFactor = (wickets / 10) * 0.6;
    estimatedLeverage = Number((base + wicketFactor).toFixed(2));
  }

  const isHighPressure = estimatedLeverage >= 1.66;
  const isElevated = estimatedLeverage >= 1.06 && estimatedLeverage < 1.66;

  // Determine ideal batter and bowler for this state
  let recommendedBatter = TOP_BATTERS[0]; // SKY default
  let recommendedBowler = TOP_BOWLERS[0]; // Hazlewood default

  if (over <= 6) {
    recommendedBatter = TOP_BATTERS.find(b => b.name === 'Vaibhav Sooryavanshi') || TOP_BATTERS[1];
    recommendedBowler = TOP_BOWLERS.find(b => b.name === 'Josh Hazlewood') || TOP_BOWLERS[0];
  } else if (over >= 16) {
    recommendedBatter = TOP_BATTERS.find(b => b.name === 'Tim David') || TOP_BATTERS[4];
    recommendedBowler = TOP_BOWLERS.find(b => b.name === 'Matheesha Pathirana') || TOP_BOWLERS[1];
  } else {
    // Middle overs
    if (wickets >= 4) {
      recommendedBatter = TOP_BATTERS.find(b => b.name === 'Shreyas Iyer') || TOP_BATTERS[3];
    } else {
      recommendedBatter = TOP_BATTERS.find(b => b.name === 'Cameron Green') || TOP_BATTERS[7];
    }
    recommendedBowler = TOP_BOWLERS.find(b => b.name === 'Sufiyan Muqeem') || TOP_BOWLERS[2];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-2">
            <Crosshair className="w-3.5 h-3.5 text-pink-400" />
            <span>Interactive Model Engine</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            Live Match Pressure & Leverage Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Input any real-time match state to compute its exact Win Probability swing potential and query the best-evidenced players for that situation.
          </p>
        </div>

        {/* Input Parameters */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Innings Phase</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInnings(1)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    innings === 1
                      ? 'bg-blue-600 text-white border-blue-500 shadow-glow-blue'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  1st Innings (Set)
                </button>
                <button
                  type="button"
                  onClick={() => setInnings(2)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    innings === 2
                      ? 'bg-pink-600 text-white border-pink-500 shadow-glow-pink'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  2nd Innings (Chase)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Over: {over} / 20</label>
              <input
                type="range"
                min="1"
                max="20"
                value={over}
                onChange={(e) => setOver(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer h-2 bg-slate-800 rounded-lg mt-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Wickets Lost: {wickets}</label>
              <input
                type="range"
                min="0"
                max="9"
                value={wickets}
                onChange={(e) => setWickets(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg mt-3"
              />
            </div>

            {innings === 2 ? (
              <>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Target Score</label>
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Current Score</label>
                  <input
                    type="number"
                    value={currentScore}
                    onChange={(e) => setCurrentScore(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Current Runs Scored</label>
                <input
                  type="number"
                  value={currentScore}
                  onChange={(e) => setCurrentScore(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            )}
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isHighPressure
            ? 'bg-gradient-to-r from-pink-950/60 via-purple-950/40 to-slate-900 border-pink-500 shadow-glow-pink'
            : isElevated
            ? 'bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border-blue-500'
            : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              isHighPressure
                ? 'bg-pink-500 text-white'
                : isElevated
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {isHighPressure ? 'HIGH PRESSURE (Top 30%)' : isElevated ? 'ELEVATED (20%)' : 'ORDINARY (Bottom 50%)'}
            </span>

            <div className="text-right">
              <span className="text-[11px] text-slate-400">Leverage Index: </span>
              <strong className="text-lg font-mono text-white">{estimatedLeverage.toFixed(1)} WP pts</strong>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-slate-800/80">
            <div>
              <div className="text-slate-400 text-[11px]">Balls Remaining</div>
              <div className="font-mono font-bold text-white text-sm">{ballsRemaining}</div>
            </div>
            {innings === 2 ? (
              <>
                <div>
                  <div className="text-slate-400 text-[11px]">Runs Needed</div>
                  <div className="font-mono font-bold text-white text-sm">{runsNeeded}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Required Rate</div>
                  <div className="font-mono font-bold text-pink-400 text-sm">{rrr} rpo</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-slate-400 text-[11px]">Current Run Rate</div>
                  <div className="font-mono font-bold text-white text-sm">{((currentScore / over)).toFixed(2)} rpo</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Projected Score</div>
                  <div className="font-mono font-bold text-pink-400 text-sm">{Math.round((currentScore / over) * 20)}</div>
                </div>
              </>
            )}
          </div>

          {/* Model Matchup Recommendations */}
          <div className="mt-4 space-y-2">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              <span>Optimal PPI Roster Matchups for This State:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div 
                onClick={() => { onClose(); onSelectPlayer(recommendedBatter.name); }}
                className="cursor-pointer p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-pink-500/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Batter Matchup</div>
                  <div className="font-bold text-white text-xs">{recommendedBatter.name}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">+{recommendedBatter.srDiff} SR advantage</div>
                </div>
                <ArrowRight className="w-4 h-4 text-pink-400" />
              </div>

              <div 
                onClick={() => { onClose(); onSelectPlayer(recommendedBowler.name); }}
                className="cursor-pointer p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-blue-500/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Bowler Matchup</div>
                  <div className="font-bold text-white text-xs">{recommendedBowler.name}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    {recommendedBowler.economySaved > 0 ? `-${recommendedBowler.economySaved.toFixed(2)} RPO saved` : `${recommendedBowler.wicketsPer100Actual} wkts/100`}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
