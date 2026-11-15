export interface BatterStats {
  rank: number;
  name: string;
  role: string;
  archetype: 'Opener' | 'Middle Order' | 'Finisher' | 'All-Rounder';
  teamContext: string;
  pressureBalls: number;
  matches: number;
  srPressure: number;
  srExpected: number;
  srDiff: number;
  srUsualDiff: number; // delta in usual/ordinary conditions
  dismissalsPer100Actual: number;
  dismissalsPer100Expected: number;
  pressureInningsPositivePct: number;
  ppi: number;
  bootstrapTop10Pct: number;
  bootstrapRange: [number, number]; // 10th to 90th percentile
  medianBootstrapRank: number;
  highPressurePhaseShare: string; // e.g. "78% Powerplay", "54% Death"
  rrStrategy: {
    category: string;
    verdict: 'Retain / Build Priority' | 'Primary Auction Target' | 'High-Value Backup' | 'Benchmark Profile' | 'High-Upside Scout Gem' | 'Defensive Bank' | 'Elite Specialist';
    rationale: string;
  };
  signals: {
    pressureImpact: number; // 0-100 normalized
    netRuns: number;
    leverageWeightedRate: number;
    consistency: number;
    riseVsUsual: number;
  };
}

export interface BowlerStats {
  rank: number;
  name: string;
  bowlingType: 'Pace' | 'Spin' | 'Mystery Spin' | 'Wrist Spin' | 'Left-Arm Pace' | 'Left-Arm Spin';
  role: 'Death Specialist' | 'Powerplay Strike' | 'Middle Overs Controller' | 'Multi-Phase';
  teamContext: string;
  pressureBalls: number;
  matches: number;
  economyPressure: number;
  economyExpected: number;
  economySaved: number; // expected - pressure (positive = runs saved per over)
  economyUsualSaved: number; // in ordinary situations
  wicketsPer100Actual: number;
  wicketsPer100Expected: number;
  pressureSpellsPositivePct: number;
  ppi: number;
  bootstrapTop10Pct: number;
  bootstrapRange: [number, number];
  medianBootstrapRank: number;
  highPressurePhaseShare: string;
  rrStrategy: {
    category: string;
    verdict: 'Retain / Build Priority' | 'Primary Auction Target' | 'High-Value Backup' | 'Benchmark Profile' | 'High-Upside Scout Gem' | 'Defensive Bank' | 'Elite Specialist';
    rationale: string;
  };
  signals: {
    pressureImpact: number;
    netRuns: number;
    leverageWeightedRate: number;
    consistency: number;
    riseVsUsual: number;
  };
}

export const TOP_BATTERS: BatterStats[] = [
  {
    rank: 1,
    name: 'Suryakumar Yadav',
    role: 'Top-Order / 360° Attacker',
    archetype: 'Middle Order',
    teamContext: 'India / MI',
    pressureBalls: 737,
    matches: 94,
    srPressure: 175,
    srExpected: 141,
    srDiff: 34,
    srUsualDiff: 22,
    dismissalsPer100Actual: 4.6,
    dismissalsPer100Expected: 5.2,
    pressureInningsPositivePct: 64,
    ppi: 2.39,
    bootstrapTop10Pct: 80,
    bootstrapRange: [1, 12],
    medianBootstrapRank: 1,
    highPressurePhaseShare: 'Middle & Death float (35% Death)',
    rrStrategy: {
      category: 'Stable Anchors / Middle Order',
      verdict: 'Benchmark Profile',
      rationale: 'Massive sample (737 balls). Rare union of heavy volume and +34 SR advantage with sub-expectation dismissals. Benchmark for high-pressure execution.'
    },
    signals: {
      pressureImpact: 98,
      netRuns: 95,
      leverageWeightedRate: 96,
      consistency: 84,
      riseVsUsual: 75
    }
  },
  {
    rank: 2,
    name: 'Vaibhav Sooryavanshi',
    role: 'Aggressive Powerplay Opener',
    archetype: 'Opener',
    teamContext: 'India U19 / RR books',
    pressureBalls: 197,
    matches: 29,
    srPressure: 237,
    srExpected: 150,
    srDiff: 87,
    srUsualDiff: 26,
    dismissalsPer100Actual: 4.1,
    dismissalsPer100Expected: 4.6,
    pressureInningsPositivePct: 70,
    ppi: 2.27,
    bootstrapTop10Pct: 79,
    bootstrapRange: [1, 16],
    medianBootstrapRank: 2,
    highPressurePhaseShare: '78% Powerplay',
    rrStrategy: {
      category: 'Powerplay Pressure Openers',
      verdict: 'Retain / Build Priority',
      rationale: 'Already on RR books in recent reports. Staggering +87 SR differential under PP pressure. Protect from open auction pool and groom long-term.'
    },
    signals: {
      pressureImpact: 96,
      netRuns: 98,
      leverageWeightedRate: 92,
      consistency: 90,
      riseVsUsual: 99
    }
  },
  {
    rank: 3,
    name: 'Phil Salt',
    role: 'Wicketkeeper Explosive Opener',
    archetype: 'Opener',
    teamContext: 'England / KKR',
    pressureBalls: 424,
    matches: 58,
    srPressure: 180,
    srExpected: 140,
    srDiff: 40,
    srUsualDiff: 24,
    dismissalsPer100Actual: 4.0,
    dismissalsPer100Expected: 4.7,
    pressureInningsPositivePct: 65,
    ppi: 2.19,
    bootstrapTop10Pct: 69,
    bootstrapRange: [1, 22],
    medianBootstrapRank: 3,
    highPressurePhaseShare: '71% Powerplay',
    rrStrategy: {
      category: 'Powerplay Pressure Openers',
      verdict: 'Primary Auction Target',
      rationale: 'WK option with massive powerplay pressure presence (71%). Sharp +40 SR edge and huge positive rise over usual baseline.'
    },
    signals: {
      pressureImpact: 92,
      netRuns: 90,
      leverageWeightedRate: 88,
      consistency: 85,
      riseVsUsual: 88
    }
  },
  {
    rank: 4,
    name: 'Shreyas Iyer',
    role: 'Middle-Order Crisis Stabilizer',
    archetype: 'Middle Order',
    teamContext: 'India / KKR / PBKS',
    pressureBalls: 524,
    matches: 61,
    srPressure: 159,
    srExpected: 140,
    srDiff: 19,
    srUsualDiff: 11,
    dismissalsPer100Actual: 3.4,
    dismissalsPer100Expected: 4.9,
    pressureInningsPositivePct: 64,
    ppi: 2.00,
    bootstrapTop10Pct: 55,
    bootstrapRange: [2, 28],
    medianBootstrapRank: 4,
    highPressurePhaseShare: 'Middle Overs (7-15)',
    rrStrategy: {
      category: 'Stable Anchors / Middle Order',
      verdict: 'Primary Auction Target',
      rationale: 'Lowest dismissal rate in the top 10 under pressure (3.4 per 100). The ultimate low-variance match-saver when early wickets fall.'
    },
    signals: {
      pressureImpact: 84,
      netRuns: 88,
      leverageWeightedRate: 86,
      consistency: 84,
      riseVsUsual: 68
    }
  },
  {
    rank: 5,
    name: 'Tim David',
    role: 'Hard-Hitting Death Overs Finisher',
    archetype: 'Finisher',
    teamContext: 'Australia / MI',
    pressureBalls: 417,
    matches: 64,
    srPressure: 182,
    srExpected: 147,
    srDiff: 35,
    srUsualDiff: 28,
    dismissalsPer100Actual: 6.2,
    dismissalsPer100Expected: 6.7,
    pressureInningsPositivePct: 54,
    ppi: 1.66,
    bootstrapTop10Pct: 42,
    bootstrapRange: [2, 42],
    medianBootstrapRank: 6,
    highPressurePhaseShare: '54% Death Overs (16-20)',
    rrStrategy: {
      category: 'Death-Overs Finishers',
      verdict: 'Primary Auction Target',
      rationale: 'Pure death-overs clutch hitter. Even with higher inherent dismissal risk, the +35 SR delta converts lost games into wins.'
    },
    signals: {
      pressureImpact: 82,
      netRuns: 80,
      leverageWeightedRate: 81,
      consistency: 68,
      riseVsUsual: 72
    }
  },
  {
    rank: 6,
    name: 'Dinesh Karthik',
    role: 'Elite Death Specialist (Retired)',
    archetype: 'Finisher',
    teamContext: 'India / RCB',
    pressureBalls: 221,
    matches: 41,
    srPressure: 184,
    srExpected: 156,
    srDiff: 28,
    srUsualDiff: 8,
    dismissalsPer100Actual: 5.4,
    dismissalsPer100Expected: 7.6,
    pressureInningsPositivePct: 70,
    ppi: 1.62,
    bootstrapTop10Pct: 44,
    bootstrapRange: [2, 44],
    medianBootstrapRank: 7,
    highPressurePhaseShare: '81% Death Overs',
    rrStrategy: {
      category: 'Death-Overs Finishers',
      verdict: 'Benchmark Profile',
      rationale: '81% death overs pressure balls with 70% positive innings. Now retired from active IPL play; serves as gold-standard finisher template.'
    },
    signals: {
      pressureImpact: 80,
      netRuns: 79,
      leverageWeightedRate: 78,
      consistency: 90,
      riseVsUsual: 86
    }
  },
  {
    rank: 7,
    name: 'Namboori Tilak Varma',
    role: 'Left-Hand Solid Middle Order',
    archetype: 'Middle Order',
    teamContext: 'India / MI',
    pressureBalls: 772,
    matches: 87,
    srPressure: 151,
    srExpected: 138,
    srDiff: 13,
    srUsualDiff: 6,
    dismissalsPer100Actual: 3.8,
    dismissalsPer100Expected: 5.4,
    pressureInningsPositivePct: 64,
    ppi: 1.61,
    bootstrapTop10Pct: 44,
    bootstrapRange: [3, 35],
    medianBootstrapRank: 7,
    highPressurePhaseShare: 'Middle & Early Recovery (No. 4-5)',
    rrStrategy: {
      category: 'Stable Anchors / Middle Order',
      verdict: 'High-Value Backup',
      rationale: 'Massive volume (772 balls, highest among batters). Left-handed composure who absorbs pressure without choking run-flow.'
    },
    signals: {
      pressureImpact: 76,
      netRuns: 78,
      leverageWeightedRate: 79,
      consistency: 84,
      riseVsUsual: 65
    }
  },
  {
    rank: 8,
    name: 'Cameron Green',
    role: 'Pace-Bowling All-Rounder Floater',
    archetype: 'All-Rounder',
    teamContext: 'Australia / RCB',
    pressureBalls: 377,
    matches: 51,
    srPressure: 172,
    srExpected: 139,
    srDiff: 33,
    srUsualDiff: 6,
    dismissalsPer100Actual: 4.0,
    dismissalsPer100Expected: 5.2,
    pressureInningsPositivePct: 70,
    ppi: 1.53,
    bootstrapTop10Pct: 34,
    bootstrapRange: [3, 52],
    medianBootstrapRank: 9,
    highPressurePhaseShare: 'Floating Top-to-Death',
    rrStrategy: {
      category: 'Stable Anchors / Middle Order',
      verdict: 'Primary Auction Target',
      rationale: 'Strike rate vaults from 149 usual to 172 under pressure (+23 delta!). Dual-skill asset with 140kph bowling as bonus.'
    },
    signals: {
      pressureImpact: 74,
      netRuns: 75,
      leverageWeightedRate: 76,
      consistency: 90,
      riseVsUsual: 91
    }
  },
  {
    rank: 9,
    name: 'Daryl Mitchell',
    role: 'Overseas Middle-Order Engine',
    archetype: 'Middle Order',
    teamContext: 'New Zealand / CSK',
    pressureBalls: 278,
    matches: 47,
    srPressure: 171,
    srExpected: 141,
    srDiff: 30,
    srUsualDiff: 4,
    dismissalsPer100Actual: 4.0,
    dismissalsPer100Expected: 5.7,
    pressureInningsPositivePct: 70,
    ppi: 1.46,
    bootstrapTop10Pct: 31,
    bootstrapRange: [4, 55],
    medianBootstrapRank: 10,
    highPressurePhaseShare: 'Middle Overs Chases',
    rrStrategy: {
      category: 'Stable Anchors / Middle Order',
      verdict: 'High-Value Backup',
      rationale: 'The textbook "rises to the occasion" profile: SR 145 usual jumps to 171 under pressure with lowest error rate vs spin and pace.'
    },
    signals: {
      pressureImpact: 72,
      netRuns: 73,
      leverageWeightedRate: 74,
      consistency: 90,
      riseVsUsual: 95
    }
  },
  {
    rank: 10,
    name: 'Naman Dhir',
    role: 'Dynamic Young Indian Finisher',
    archetype: 'Finisher',
    teamContext: 'India / MI',
    pressureBalls: 165,
    matches: 27,
    srPressure: 188,
    srExpected: 144,
    srDiff: 44,
    srUsualDiff: 28,
    dismissalsPer100Actual: 3.6,
    dismissalsPer100Expected: 5.5,
    pressureInningsPositivePct: 67,
    ppi: 1.43,
    bootstrapTop10Pct: 36,
    bootstrapRange: [3, 58],
    medianBootstrapRank: 10,
    highPressurePhaseShare: '37% Death Overs',
    rrStrategy: {
      category: 'Death-Overs Finishers',
      verdict: 'High-Upside Scout Gem',
      rationale: 'SR 188 under pressure with only 3.6 dismissals/100. Sample is compact (165 balls) but signal is intensely positive.'
    },
    signals: {
      pressureImpact: 75,
      netRuns: 74,
      leverageWeightedRate: 72,
      consistency: 86,
      riseVsUsual: 78
    }
  }
];

export const TOP_BOWLERS: BowlerStats[] = [
  {
    rank: 1,
    name: 'Josh Hazlewood',
    bowlingType: 'Pace',
    role: 'Powerplay Strike',
    teamContext: 'Australia / RCB',
    pressureBalls: 460,
    matches: 51,
    economyPressure: 7.62,
    economyExpected: 9.07,
    economySaved: 1.45,
    economyUsualSaved: -0.30,
    wicketsPer100Actual: 8.4,
    wicketsPer100Expected: 5.7,
    pressureSpellsPositivePct: 55,
    ppi: 3.76,
    bootstrapTop10Pct: 90,
    bootstrapRange: [1, 8],
    medianBootstrapRank: 1,
    highPressurePhaseShare: 'Powerplay & Middle (Overs 1-12)',
    rrStrategy: {
      category: 'Pace Under Pressure',
      verdict: 'Primary Auction Target',
      rationale: 'Highest PPI in entire dataset (3.76) and 90% bootstrap stability. Saves 1.45 RPO and strikes at 8.4 wkts/100. Unquestioned #1.'
    },
    signals: {
      pressureImpact: 100,
      netRuns: 99,
      leverageWeightedRate: 98,
      consistency: 78,
      riseVsUsual: 96
    }
  },
  {
    rank: 2,
    name: 'Matheesha Pathirana',
    bowlingType: 'Pace',
    role: 'Death Specialist',
    teamContext: 'Sri Lanka / CSK',
    pressureBalls: 351,
    matches: 35,
    economyPressure: 7.23,
    economyExpected: 9.24,
    economySaved: 2.01,
    economyUsualSaved: 0.60,
    wicketsPer100Actual: 7.9,
    wicketsPer100Expected: 6.8,
    pressureSpellsPositivePct: 53,
    ppi: 1.86,
    bootstrapTop10Pct: 59,
    bootstrapRange: [1, 32],
    medianBootstrapRank: 2,
    highPressurePhaseShare: '52% Death Overs (16-20)',
    rrStrategy: {
      category: 'Pace Under Pressure',
      verdict: 'Elite Specialist',
      rationale: 'Over 2 runs per over saved in death overs pressure against 9.24 expectation. Edge is larger and more consistent than Bumrah in this sample.'
    },
    signals: {
      pressureImpact: 88,
      netRuns: 87,
      leverageWeightedRate: 86,
      consistency: 74,
      riseVsUsual: 89
    }
  },
  {
    rank: 3,
    name: 'Sufiyan Muqeem',
    bowlingType: 'Wrist Spin',
    role: 'Middle Overs Controller',
    teamContext: 'Pakistan',
    pressureBalls: 156,
    matches: 16,
    economyPressure: 5.08,
    economyExpected: 7.63,
    economySaved: 2.55,
    economyUsualSaved: 0.80,
    wicketsPer100Actual: 7.2,
    wicketsPer100Expected: 5.4,
    pressureSpellsPositivePct: 69,
    ppi: 1.83,
    bootstrapTop10Pct: 67,
    bootstrapRange: [1, 25],
    medianBootstrapRank: 3,
    highPressurePhaseShare: '86% Middle Overs (7-15)',
    rrStrategy: {
      category: 'Spin in Middle Overs',
      verdict: 'High-Upside Scout Gem',
      rationale: 'Lowest pressure economy in top 10 (5.08, saving 2.55 RPO). Small sample (156 balls), making him an elite value discovery for scouting.'
    },
    signals: {
      pressureImpact: 89,
      netRuns: 90,
      leverageWeightedRate: 84,
      consistency: 90,
      riseVsUsual: 97
    }
  },
  {
    rank: 4,
    name: 'Rashid Khan',
    bowlingType: 'Wrist Spin',
    role: 'Middle Overs Controller',
    teamContext: 'Afghanistan / GT',
    pressureBalls: 727,
    matches: 91,
    economyPressure: 7.32,
    economyExpected: 8.13,
    economySaved: 0.81,
    economyUsualSaved: 0.70,
    wicketsPer100Actual: 5.4,
    wicketsPer100Expected: 5.2,
    pressureSpellsPositivePct: 46,
    ppi: 1.73,
    bootstrapTop10Pct: 46,
    bootstrapRange: [2, 42],
    medianBootstrapRank: 4,
    highPressurePhaseShare: 'Middle Overs (7-15)',
    rrStrategy: {
      category: 'Spin in Middle Overs',
      verdict: 'Defensive Bank',
      rationale: '727 balls of high reliability. Opponents refuse to take risks against him; guaranteed stranglehold in high-leverage middle overs.'
    },
    signals: {
      pressureImpact: 80,
      netRuns: 81,
      leverageWeightedRate: 85,
      consistency: 65,
      riseVsUsual: 68
    }
  },
  {
    rank: 5,
    name: 'Taskin Ahmed',
    bowlingType: 'Pace',
    role: 'Multi-Phase',
    teamContext: 'Bangladesh / Franchise',
    pressureBalls: 278,
    matches: 37,
    economyPressure: 6.93,
    economyExpected: 8.39,
    economySaved: 1.46,
    economyUsualSaved: -0.40,
    wicketsPer100Actual: 7.1,
    wicketsPer100Expected: 6.0,
    pressureSpellsPositivePct: 56,
    ppi: 1.66,
    bootstrapTop10Pct: 51,
    bootstrapRange: [2, 38],
    medianBootstrapRank: 5,
    highPressurePhaseShare: '43% Powerplay, 36% Death',
    rrStrategy: {
      category: 'Pace Under Pressure',
      verdict: 'Primary Auction Target',
      rationale: 'True dual-phase pacer (43% PP, 36% death) with sub-7.00 economy under pressure and 56% positive spells. Highly cost-effective target.'
    },
    signals: {
      pressureImpact: 78,
      netRuns: 79,
      leverageWeightedRate: 80,
      consistency: 76,
      riseVsUsual: 92
    }
  },
  {
    rank: 6,
    name: 'Varun Chakravarthy',
    bowlingType: 'Mystery Spin',
    role: 'Middle Overs Controller',
    teamContext: 'India / KKR',
    pressureBalls: 542,
    matches: 70,
    economyPressure: 7.98,
    economyExpected: 7.94,
    economySaved: -0.04,
    economyUsualSaved: -0.10,
    wicketsPer100Actual: 6.8,
    wicketsPer100Expected: 5.1,
    pressureSpellsPositivePct: 45,
    ppi: 1.65,
    bootstrapTop10Pct: 47,
    bootstrapRange: [3, 48],
    medianBootstrapRank: 7,
    highPressurePhaseShare: 'Middle Overs & 17th Over',
    rrStrategy: {
      category: 'Spin in Middle Overs',
      verdict: 'Elite Specialist',
      rationale: 'Wicket-strike monster (6.8 vs 5.1 expected). Does not just squeeze—takes wickets in batches when pressure mounts.'
    },
    signals: {
      pressureImpact: 77,
      netRuns: 76,
      leverageWeightedRate: 78,
      consistency: 64,
      riseVsUsual: 70
    }
  },
  {
    rank: 7,
    name: 'Kagiso Rabada',
    bowlingType: 'Pace',
    role: 'Powerplay Strike',
    teamContext: 'South Africa / PBKS',
    pressureBalls: 487,
    matches: 65,
    economyPressure: 8.92,
    economyExpected: 8.86,
    economySaved: -0.06,
    economyUsualSaved: -0.30,
    wicketsPer100Actual: 7.4,
    wicketsPer100Expected: 4.9,
    pressureSpellsPositivePct: 49,
    ppi: 1.63,
    bootstrapTop10Pct: 44,
    bootstrapRange: [3, 45],
    medianBootstrapRank: 8,
    highPressurePhaseShare: '58% Powerplay',
    rrStrategy: {
      category: 'Pace Under Pressure',
      verdict: 'Primary Auction Target',
      rationale: '58% powerplay pressure presence with +2.5 wicket-taking rate over expectation. Blows top orders away in big matches.'
    },
    signals: {
      pressureImpact: 76,
      netRuns: 75,
      leverageWeightedRate: 77,
      consistency: 69,
      riseVsUsual: 72
    }
  },
  {
    rank: 8,
    name: 'Jasprit Bumrah',
    bowlingType: 'Pace',
    role: 'Multi-Phase',
    teamContext: 'India / MI',
    pressureBalls: 560,
    matches: 65,
    economyPressure: 7.31,
    economyExpected: 8.96,
    economySaved: 1.65,
    economyUsualSaved: 0.50,
    wicketsPer100Actual: 4.4,
    wicketsPer100Expected: 5.6,
    pressureSpellsPositivePct: 46,
    ppi: 1.56,
    bootstrapTop10Pct: 40,
    bootstrapRange: [3, 52],
    medianBootstrapRank: 8,
    highPressurePhaseShare: 'Powerplay & Death (Split)',
    rrStrategy: {
      category: 'Pace Under Pressure',
      verdict: 'Defensive Bank',
      rationale: 'Absolute run suppression (7.31 vs 8.96 expected). Batters play him with utmost defense, sacrificing wicket opportunities for dot survival.'
    },
    signals: {
      pressureImpact: 74,
      netRuns: 76,
      leverageWeightedRate: 79,
      consistency: 65,
      riseVsUsual: 82
    }
  },
  {
    rank: 9,
    name: 'Krunal Pandya',
    bowlingType: 'Left-Arm Spin',
    role: 'Middle Overs Controller',
    teamContext: 'India / LSG / RCB',
    pressureBalls: 426,
    matches: 54,
    economyPressure: 7.59,
    economyExpected: 8.09,
    economySaved: 0.50,
    economyUsualSaved: 0.10,
    wicketsPer100Actual: 6.4,
    wicketsPer100Expected: 4.5,
    pressureSpellsPositivePct: 45,
    ppi: 1.49,
    bootstrapTop10Pct: 46,
    bootstrapRange: [3, 51],
    medianBootstrapRank: 9,
    highPressurePhaseShare: 'Middle Overs (Overs 7-14)',
    rrStrategy: {
      category: 'Spin in Middle Overs',
      verdict: 'High-Value Backup',
      rationale: 'Tactical left-arm option who out-strikes expectations (6.4 vs 4.5 wkts/100) while keeping economy under 7.60.'
    },
    signals: {
      pressureImpact: 71,
      netRuns: 72,
      leverageWeightedRate: 74,
      consistency: 64,
      riseVsUsual: 74
    }
  },
  {
    rank: 10,
    name: 'Sunil Narine',
    bowlingType: 'Spin',
    role: 'Multi-Phase',
    teamContext: 'West Indies / KKR',
    pressureBalls: 442,
    matches: 53,
    economyPressure: 6.92,
    economyExpected: 8.11,
    economySaved: 1.19,
    economyUsualSaved: 0.40,
    wicketsPer100Actual: 4.6,
    wicketsPer100Expected: 4.9,
    pressureSpellsPositivePct: 45,
    ppi: 1.45,
    bootstrapTop10Pct: 39,
    bootstrapRange: [4, 56],
    medianBootstrapRank: 10,
    highPressurePhaseShare: 'PP & Death Flex',
    rrStrategy: {
      category: 'Spin in Middle Overs',
      verdict: 'Defensive Bank',
      rationale: 'Sub-7 economy (6.92) across 442 pressure balls. Extreme discipline and deception that limits opponents to low boundary counts.'
    },
    signals: {
      pressureImpact: 70,
      netRuns: 71,
      leverageWeightedRate: 73,
      consistency: 64,
      riseVsUsual: 80
    }
  }
];

export const METHODOLOGY_METRICS = {
  totalMatches: 810,
  rawMatches: 883,
  totalDeliveries: 193294,
  brierScore: 0.179,
  baselineBrierScore: 0.250,
  logLoss: 0.526,
  eligibleBatters: 151,
  eligibleBowlers: 154,
  highPressureThreshold: '>= 0.0166',
  ordinaryThreshold: '<= 0.0106',
  wicketToRunExchangeRate: 7.6,
  timePeriod: '2022-2026'
};

export const PRESSURE_TIERS = [
  {
    tier: 'High Pressure',
    rule: 'Leverage in top 30% (>= 0.0166)',
    share: '30%',
    meanLeverage: 3.17,
    distFrom50: 0.16,
    secondInningsShare: '58%',
    deathOversShare: '25%',
    avgRunRate: 1.47,
    avgDismissalRate: '5.9%',
    description: 'Close chases, final overs, and early collapses in a live game where every ball swings win probability dramatically.'
  },
  {
    tier: 'Elevated',
    rule: 'Between median and top 30%',
    share: '20%',
    meanLeverage: 1.25,
    distFrom50: 0.22,
    secondInningsShare: '51%',
    deathOversShare: '24%',
    avgRunRate: 1.42,
    avgDismissalRate: '5.8%',
    description: 'Normal competitive cricket where game balance is active but not immediate crisis.'
  },
  {
    tier: 'Ordinary (Usual)',
    rule: 'Bottom 50% (<= 0.0106)',
    share: '50%',
    meanLeverage: 0.50,
    distFrom50: 0.29,
    secondInningsShare: '47%',
    deathOversShare: '23%',
    avgRunRate: 1.39,
    avgDismissalRate: '5.7%',
    description: 'Settled or lopsided match states; provides the individual player baseline for comparison.'
  }
];

export const CHASE_HEATMAP_DATA = [
  { rrrLabel: '14+', b1_12: 2.9, b13_24: 0.8, b25_36: 0.4, b37_48: 0.3, b49_60: 0.2 },
  { rrrLabel: '12-14', b1_12: 11.0, b13_24: 4.8, b25_36: 3.0, b37_48: 1.6, b49_60: 1.1 },
  { rrrLabel: '10-12', b1_12: 13.6, b13_24: 6.0, b25_36: 3.9, b37_48: 2.8, b49_60: 2.2 },
  { rrrLabel: '8-10', b1_12: 10.1, b13_24: 4.3, b25_36: 3.4, b37_48: 2.7, b49_60: 2.5 },
  { rrrLabel: '6-8', b1_12: 4.3, b13_24: 1.8, b25_36: 1.2, b37_48: 1.1, b49_60: 1.3 },
  { rrrLabel: '<=6', b1_12: 1.8, b13_24: 0.4, b25_36: 0.3, b37_48: 0.3, b49_60: 0.3 },
];

export const OVER_LEVERAGE_DATA = [
  { over: 1, inn1: 1.15, inn2: 1.25, threshold: 1.66 },
  { over: 2, inn1: 1.18, inn2: 1.35, threshold: 1.66 },
  { over: 3, inn1: 1.17, inn2: 1.48, threshold: 1.66 },
  { over: 4, inn1: 1.19, inn2: 1.55, threshold: 1.66 },
  { over: 5, inn1: 1.20, inn2: 1.52, threshold: 1.66 },
  { over: 6, inn1: 1.22, inn2: 1.58, threshold: 1.66 },
  { over: 7, inn1: 1.15, inn2: 1.50, threshold: 1.66 },
  { over: 8, inn1: 1.16, inn2: 1.49, threshold: 1.66 },
  { over: 9, inn1: 1.18, inn2: 1.52, threshold: 1.66 },
  { over: 10, inn1: 1.20, inn2: 1.56, threshold: 1.66 },
  { over: 11, inn1: 1.22, inn2: 1.60, threshold: 1.66 },
  { over: 12, inn1: 1.25, inn2: 1.68, threshold: 1.66 },
  { over: 13, inn1: 1.28, inn2: 1.75, threshold: 1.66 },
  { over: 14, inn1: 1.32, inn2: 1.85, threshold: 1.66 },
  { over: 15, inn1: 1.39, inn2: 2.05, threshold: 1.66 },
  { over: 16, inn1: 1.52, inn2: 2.30, threshold: 1.66 },
  { over: 17, inn1: 1.68, inn2: 2.75, threshold: 1.66 },
  { over: 18, inn1: 1.95, inn2: 3.30, threshold: 1.66 },
  { over: 19, inn1: 2.35, inn2: 4.10, threshold: 1.66 },
  { over: 20, inn1: 2.85, inn2: 4.80, threshold: 1.66 },
];

export const FIVE_SIGNALS_INFO = [
  {
    name: 'Pressure Impact',
    weight: '30%',
    weightNum: 0.30,
    batterReliability: 0.11,
    bowlerReliability: 0.05,
    summary: 'Mean ball value over high-pressure deliveries.',
    detail: 'The direct answer to "what does this player add when it matters?" Computed as win probability added above expectation on balls in top 30% leverage.'
  },
  {
    name: 'Pressure Net Runs',
    weight: '25%',
    weightNum: 0.25,
    batterReliability: 0.16,
    bowlerReliability: 0.05,
    summary: 'Runs above expected minus (7.6 × wickets above expected).',
    detail: 'A run-and-wicket lens that does not depend on the fine detail of the WP curve. 7.6 is the empirical wicket-to-run exchange rate in pressure states.'
  },
  {
    name: 'Leverage-Weighted Rate',
    weight: '20%',
    weightNum: 0.20,
    batterReliability: 0.18,
    bowlerReliability: 0.08,
    summary: 'Total sum of ball values divided by sum of leverage across all balls.',
    detail: 'Uses the entire career sample and treats pressure as continuous, providing substantial stability against sample flukes.'
  },
  {
    name: 'Consistency',
    weight: '15%',
    weightNum: 0.15,
    batterReliability: 0.12,
    bowlerReliability: 0.05,
    summary: 'Share of pressure spells / innings (>=3 balls) that added WP.',
    detail: 'Answers the "consistently" requirement in the brief. Beta-shrunk toward the league average rate to prevent flattering short streaks.'
  },
  {
    name: 'Rise or Dip vs Usual',
    weight: '10%',
    weightNum: 0.10,
    batterReliability: 0.12,
    bowlerReliability: 0.05,
    summary: 'Stakes-normalized performance in high pressure minus ordinary balls.',
    detail: 'Isolates true "big game temperament" by checking whether a player raises their output or wilts compared to their own baseline.'
  }
];

export const TEMPORAL_VALIDATION = [
  { role: 'Batters', trainedOn: '<= 2023', testedOn: '> 2023', players: 86, rankCorr: 0.11, top10Score: 1.03, restScore: 0.31 },
  { role: 'Batters', trainedOn: '<= 2024', testedOn: '> 2024', players: 96, rankCorr: -0.05, top10Score: 0.57, restScore: 0.07 },
  { role: 'Bowlers', trainedOn: '<= 2023', testedOn: '> 2023', players: 89, rankCorr: 0.14, top10Score: 0.65, restScore: -0.26 },
  { role: 'Bowlers', trainedOn: '<= 2024', testedOn: '> 2024', players: 99, rankCorr: 0.03, top10Score: 0.11, restScore: -0.04 }
];

export const SENSITIVITY_TABLE = [
  { setting: 'Pressure = top 40% (P60)', battersOverlap: '7 / 10', battersRho: 0.94, bowlersOverlap: '8 / 10', bowlersRho: 0.95 },
  { setting: 'Pressure = top 20% (P80)', battersOverlap: '8 / 10', battersRho: 0.93, bowlersOverlap: '7 / 10', bowlersRho: 0.92 },
  { setting: 'Pressure = top 10% (P90)', battersOverlap: '4 / 10', battersRho: 0.68, bowlersOverlap: '6 / 10', bowlersRho: 0.84 },
  { setting: 'Equal component weights', battersOverlap: '8 / 10', battersRho: 0.99, bowlersOverlap: '9 / 10', bowlersRho: 0.99 },
  { setting: 'No delta component', battersOverlap: '9 / 10', battersRho: 0.99, bowlersOverlap: '10 / 10', bowlersRho: 0.99 },
  { setting: 'Stricter eligibility (>= 200 balls)', battersOverlap: '8 / 10', battersRho: 1.00, bowlersOverlap: '9 / 10', bowlersRho: 1.00 },
  { setting: 'No opposition down-weighting', battersOverlap: '9 / 10', battersRho: 1.00, bowlersOverlap: '10 / 10', bowlersRho: 1.00 },
  { setting: 'IPL-only data', battersOverlap: '4 / 10', battersRho: 0.88, bowlersOverlap: '6 / 10', bowlersRho: 0.86 },
  { setting: 'T20I-only data', battersOverlap: '4 / 10', battersRho: 0.76, bowlersOverlap: '4 / 10', bowlersRho: 0.80 },
];

export const RR_STRATEGY_MATRIX = [
  {
    need: 'Powerplay pressure openers',
    options: ['Vaibhav Sooryavanshi', 'Phil Salt'],
    why: 'High-leverage early overs where they run 40 to 90 strike-rate points above expectation',
    actionPlan: 'Prioritize Sooryavanshi as retention/internal build asset; target Salt aggressively as top-order wicketkeeper-batter.'
  },
  {
    need: 'Death-overs finishers',
    options: ['Tim David', 'Dinesh Karthik (profile)', 'Naman Dhir'],
    why: '28 to 43 strike-rate points above expectation in death-heavy pressure situations',
    actionPlan: 'Bid decisively on Tim David for late-overs boundary surge; scout Naman Dhir as an undervalued Indian finisher.'
  },
  {
    need: 'Stable anchors / middle order',
    options: ['Suryakumar Yadav', 'Shreyas Iyer', 'Tilak Varma', 'Daryl Mitchell'],
    why: 'Large samples and rock-bottom dismissal rates in tight, collapsing match states',
    actionPlan: 'Shreyas Iyer provides elite crisis stability (3.4 dismissals/100); Cameron Green / Daryl Mitchell offer overseas versatility.'
  },
  {
    need: 'Pace under pressure',
    options: ['Josh Hazlewood', 'Matheesha Pathirana (death)', 'Taskin Ahmed', 'Kagiso Rabada', 'Jasprit Bumrah'],
    why: 'Run suppression and strike bowling in close games across powerplay and death',
    actionPlan: 'Josh Hazlewood is the ultimate anchor pacer (#1 dataset PPI). Pathirana delivers unrivaled death over run saving (-2.01 RPO).'
  },
  {
    need: 'Spin in the middle overs',
    options: ['Rashid Khan', 'Sufiyan Muqeem', 'Varun Chakravarthy', 'Krunal Pandya', 'Sunil Narine'],
    why: 'Economy and wickets significantly better than state-expected through overs 7 to 15',
    actionPlan: 'Target Sufiyan Muqeem as high-upside left-arm wrist spin gem (5.08 pressure economy); Varun Chakravarthy for pure wicket strike-power.'
  }
];
