# 🏏 The Pressure-Proof Index (PPI) Dashboard
### *SupeRR Selector Season 2 | Round 1 — Rajasthan Royals Analytics*

> **Who actually delivers when the match is on the line?**  
> A win-probability-based ranking and analytics platform for IPL and T20I batters and bowlers (2022–2026).

---

## 🚀 Live Demo & Links

- **Live Vercel Deployment:** [https://flying-juniper-pvoxweb.tmp.now](https://flying-juniper-pvoxweb.tmp.now)
- **1-Click Permanent Claim to Your Vercel Account:** [Claim on Vercel Dashboard](https://vercel.com/claim-deployment?code=55e9b997-87a3-4fa1-9733-5533d1b2293b)
- **Repository:** [https://github.com/srujan1-creator/RRhackathon](https://github.com/srujan1-creator/RRhackathon)

---

## ⚡ The Methodology in Five Lines

1. **Pressure is measured, not assumed:** Every delivery is assigned a **Leverage Index (LI)** — the expected absolute swing in the batting side's win probability on the next ball. Deliveries in the top 30% of leverage ($\ge 0.0166$) are classified as **High Pressure** (tight chases, final overs, wickets falling in clusters).
2. **Performance judged against context:** A ball’s value is the **Win Probability Added (WPA) above expectation**, subtracting what an average player would achieve in that exact match state. Both batters and bowlers are measured on the identical calibrated scale.
3. **Five distinct blended signals:** Blends **Pressure Impact (30%)**, **Pressure Net Runs (25%)**, **Leverage-Weighted Rate (20%)**, **Consistency (15%)**, and **Rise vs. Usual Baseline (10%)**, shrunk toward the mean via Empirical Bayes shrinkage so small samples cannot flatter anyone.
4. **Honest about noise:** T20 pressure samples are small. The system publishes **200 match-level bootstrap rank ranges** (10th to 90th percentile) for every player. The most robust picks are **Josh Hazlewood (90% in top 10)**, **Suryakumar Yadav (80%)**, **Vaibhav Sooryavanshi (79%)**, and **Phil Salt (69%)**.
5. **Built on rigorous data:** 810 completed matches, 193,294 deliveries (IPL and T20I combined), calibrated with out-of-fold gradient boosting (Brier score: **0.179** vs. 0.250 baseline, log-loss: **0.526**).

---

## 🏆 Final Rankings

### Top 10 Batters Under Pressure
| Rank | Batter | Pressure Balls / Matches | Strike Rate (Act vs Exp) | Dismissals / 100b | Positive Innings % | PPI Score | Top-10 Bootstrap % |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **1** | **Suryakumar Yadav** | 737 / 94 | 175 vs 141 (+34) | 4.6 vs 5.2 | 64% | **2.39** | 80% |
| **2** | **Vaibhav Sooryavanshi** | 197 / 29 | 237 vs 150 (+87) | 4.1 vs 4.6 | 70% | **2.27** | 79% |
| **3** | **Phil Salt** | 424 / 58 | 180 vs 140 (+40) | 4.0 vs 4.7 | 65% | **2.19** | 69% |
| **4** | **Shreyas Iyer** | 524 / 61 | 159 vs 140 (+19) | 3.4 vs 4.9 | 64% | **2.00** | 55% |
| **5** | **Tim David** | 417 / 64 | 182 vs 147 (+35) | 6.2 vs 6.7 | 54% | **1.66** | 42% |
| **6** | **Dinesh Karthik** | 221 / 41 | 184 vs 156 (+28) | 5.4 vs 7.6 | 70% | **1.62** | 44% |
| **7** | **Namboori Tilak Varma** | 772 / 87 | 151 vs 138 (+13) | 3.8 vs 5.4 | 64% | **1.61** | 44% |
| **8** | **Cameron Green** | 377 / 51 | 172 vs 139 (+33) | 4.0 vs 5.2 | 70% | **1.53** | 34% |
| **9** | **Daryl Mitchell** | 278 / 47 | 171 vs 141 (+30) | 4.0 vs 5.7 | 70% | **1.46** | 31% |
| **10** | **Naman Dhir** | 165 / 27 | 188 vs 144 (+44) | 3.6 vs 5.5 | 67% | **1.43** | 36% |

### Top 10 Bowlers Under Pressure
| Rank | Bowler | Pressure Balls / Matches | Economy (Act vs Exp) | Wickets / 100b | Positive Spells % | PPI Score | Top-10 Bootstrap % |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **1** | **Josh Hazlewood** | 460 / 51 | 7.62 vs 9.07 (-1.45) | 8.4 vs 5.7 | 55% | **3.76** | 90% |
| **2** | **Matheesha Pathirana** | 351 / 35 | 7.23 vs 9.24 (-2.01) | 7.9 vs 6.8 | 53% | **1.86** | 59% |
| **3** | **Sufiyan Muqeem** | 156 / 16 | 5.08 vs 7.63 (-2.55) | 7.2 vs 5.4 | 69% | **1.83** | 67% |
| **4** | **Rashid Khan** | 727 / 91 | 7.32 vs 8.13 (-0.81) | 5.4 vs 5.2 | 46% | **1.73** | 46% |
| **5** | **Taskin Ahmed** | 278 / 37 | 6.93 vs 8.39 (-1.46) | 7.1 vs 6.0 | 56% | **1.66** | 51% |
| **6** | **Varun Chakravarthy** | 542 / 70 | 7.98 vs 7.94 (+0.04) | 6.8 vs 5.1 | 45% | **1.65** | 47% |
| **7** | **Kagiso Rabada** | 487 / 65 | 8.92 vs 8.86 (+0.06) | 7.4 vs 4.9 | 49% | **1.63** | 44% |
| **8** | **Jasprit Bumrah** | 560 / 65 | 7.31 vs 8.96 (-1.65) | 4.4 vs 5.6 | 46% | **1.56** | 40% |
| **9** | **Krunal Pandya** | 426 / 54 | 7.59 vs 8.09 (-0.50) | 6.4 vs 4.5 | 45% | **1.49** | 46% |
| **10** | **Sunil Narine** | 442 / 53 | 6.92 vs 8.11 (-1.19) | 4.6 vs 4.9 | 45% | **1.45** | 39% |

---

## 🛡️ Rajasthan Royals (RR) Tactical War Room Recommendations

1. **Powerplay Openers:** 
   - **Vaibhav Sooryavanshi:** Retention & development priority (+87 SR edge under powerplay pressure).
   - **Phil Salt:** Primary auction target (+40 SR edge and wicketkeeping utility).
2. **Death-Overs Finishers:** 
   - **Tim David:** Primary late-overs target (54% death pressure, +35 SR delta).
   - **Naman Dhir:** High-upside emerging Indian finisher (188 SR under pressure).
3. **Middle-Order Stabilizers:** 
   - **Shreyas Iyer:** Lowest dismissal rate under pressure (3.4 per 100 balls) — ideal crisis anchor.
   - **Cameron Green / Daryl Mitchell:** Dual-threat overseas stabilizers who elevate their output in big games.
4. **Pace Under Pressure:** 
   - **Josh Hazlewood:** #1 overall PPI target (saves 1.45 RPO, strikes 8.4 wkts/100).
   - **Matheesha Pathirana:** Death specialist saving 2.01 RPO against 9.24 expected.
5. **Middle-Overs Spin:** 
   - **Sufiyan Muqeem:** Standout market arbitrage gem (left-arm wrist spin, 5.08 pressure economy).
   - **Varun Chakravarthy:** Direct wicket-taking threat in the middle overs.

---

## 🛠️ Tech Stack & Key Features

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS (Custom Rajasthan Royals Pink `#EA1B75` & Royal Navy `#050814` theme, glassmorphism)
- **Visualizations:** Recharts & custom SVG graphics
  - Interactive Chase Pressure Heatmap (RRR × Balls Remaining)
  - Over-by-Over Pressure Progression Line Curves
  - 10th to 90th percentile Bootstrap Whisker plots
  - Rise vs. Usual side-by-side comparative bars
- **Interactive Tools:**
  - Real-time Match State Pressure & Leverage Simulator
  - Rajasthan Royals Pressure Core XI Builder with live IPL Overseas Cap validation and Confetti celebration
  - Player Profile modal with 5-signal pentagon decomposition

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/srujan1-creator/RRhackathon.git
   cd RRhackathon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 📦 Vercel Deployment

Deploy directly via Vercel CLI:
```bash
vercel --prod
```
Or import this repository directly into your [Vercel Dashboard](https://vercel.com/new).
