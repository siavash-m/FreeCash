import type { Question, ProgressStep } from '../types';

export const questions: Question[] = [
  {
    title: 'How would you like to get paid?',
    subtitle: "We'll set this up before your first reward.",
    balance: '$ 2.00',
    showBack: false,
    options: [
      { id: 'paypal',   icon: '/assets/paypal.svg',        iconAlt: 'PayPal',        label: 'Fast & instant',    title: 'Paypal'        },
      { id: 'bank',     icon: '/assets/bank-transfer.svg', iconAlt: 'Bank Transfer',  label: 'Direct to account', title: 'Bank Transfer'  },
      { id: 'crypto',   icon: '/assets/crypto.svg',        iconAlt: 'Crypto',         label: 'Bitcoin & more',    title: 'Crypto'        },
      { id: 'amazon',   icon: '/assets/amazon.svg',        iconAlt: 'Amazon',         label: 'Gift cards',        title: 'Amazon'        },
    ],
  },
  {
    title: 'What kind of games do you enjoy?',
    subtitle: "We'll match offers to your taste.",
    balance: '$ 3.00',
    showBack: true,
    options: [
      { id: 'casual',   icon: '/assets/game-casual.svg',   iconAlt: 'Casual',    label: 'Easy & fun',        title: 'Casual'   },
      { id: 'strategy', icon: '/assets/game-strategy.svg', iconAlt: 'Strategy',  label: 'Plan & build',      title: 'Strategy' },
      { id: 'rpg',      icon: '/assets/game-rpg.svg',      iconAlt: 'RPG',       label: 'Story & adventure', title: 'RPG'      },
      { id: 'sports',   icon: '/assets/game-sports.svg',   iconAlt: 'Sports',    label: 'Racing & football', title: 'Sports'   },
    ],
  },
  {
    title: 'How long do you have to play right now?',
    subtitle: "We'll show offers that fit your session.",
    balance: '$ 3.00',
    showBack: true,
    options: [
      { id: '5-15',  icon: '/assets/time-quick.svg',    iconAlt: '5–15 min',  label: 'Quick win',    title: '5 – 15 min'  },
      { id: '15-30', icon: '/assets/time-medium.svg',   iconAlt: '15–30 min', label: 'Comfortable',  title: '15 – 30 min' },
      { id: '45-60', icon: '/assets/time-long.svg',     iconAlt: '45–60 min', label: 'Deep session', title: '45 – 60 min' },
      { id: '60+',   icon: '/assets/time-marathon.svg', iconAlt: '60+ min',   label: 'Marathon',     title: '60+ min'     },
    ],
  },
];

/**
 * Progress bar — 5 segments: [intro₀, intro₁, Q1, Q2, Q3]
 *
 * Bar → step mapping (1-indexed):
 *   Q1 (index 0) → bar 2 → step 3   ← partial
 *   Q2 (index 1) → bar 3 → step 4   ← partial
 *   Q3 (index 2) → bar 4 → step 5   ← partial
 *
 * Direction has no effect on step position — Q2 always shows step 4
 * whether reached forward or by pressing back.
 * Bars before partial: glow (answered) or skip (skipped).
 */
export function computeProgress(
  questionIndex: number,
  history: ('answered' | 'skipped' | null)[]
): ProgressStep[] {
  const partialBar = questionIndex + 2; // Q1→2, Q2→3, Q3→4

  return [0, 1, 2, 3, 4].map((barIdx): ProgressStep => {
    if (barIdx === partialBar) return 'partial';
    if (barIdx > partialBar)  return 'empty';
    if (barIdx < 2)           return 'glow'; // intro always done
    const qi = barIdx - 2;
    return history[qi] === 'skipped' ? 'skip' : 'glow';
  });
}
