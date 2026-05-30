import type { ProgressStep } from '../../types';

export default function ProgressBar({ steps }: { steps: ProgressStep[] }) {
  return (
    <div data-animate="progress" className="flex gap-[6px] h-[10px] items-center w-full">
      {steps.map((step, i) => {
        if (step === 'skip') {
          // Flat pill with a 2px dark border — no inner highlight layers
          return (
            <div
              key={i}
              className="relative flex-1 h-[10px] rounded-[100px]"
              style={{ background: '#7d7d9e', border: '2px solid #1d1e30', boxSizing: 'border-box' }}
            />
          );
        }

        const styles = {
          glow:    { bg: '#00d676', inner: '#03bf66', shimmer: '#1cf192', glow: '0 0 12px rgba(0,214,118,0.8)' },
          partial: { bg: '#cbcbde', inner: '#bfc1c5', shimmer: 'white',   glow: undefined },
          empty:   { bg: '#33334d', inner: '#2a2b3d', shimmer: '#3c3d52', glow: undefined },
        }[step];

        return (
          <div
            key={i}
            className="relative flex-1 h-[10px] rounded-[100px] overflow-hidden"
            style={{ background: styles.bg, boxShadow: styles.glow }}
          >
            <div className="absolute" style={{ background: styles.inner,   inset: '4.55px 2px 1.45px', borderRadius: '300px 300px 50px 50px' }} />
            <div className="absolute" style={{ background: styles.shimmer, inset: '1.55px 2px 4.45px', borderRadius: '50px 50px 300px 300px' }} />
          </div>
        );
      })}
    </div>
  );
}
