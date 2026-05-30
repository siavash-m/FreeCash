type ProgressStep = 'glow' | 'partial' | 'empty';

export default function ProgressBar({ steps }: { steps: ProgressStep[] }) {
  return (
    <div data-animate="progress" className="flex gap-[6px] h-[10px] items-center w-full">
      {steps.map((step, i) => {
        const bg      = step === 'glow' ? '#00d676' : step === 'partial' ? '#cbcbde' : '#33334d';
        const inner   = step === 'glow' ? '#03bf66' : step === 'partial' ? '#bfc1c5' : '#2a2b3d';
        const shimmer = step === 'glow' ? '#1cf192' : step === 'partial' ? 'white'   : '#3c3d52';
        return (
          <div
            key={i}
            className="relative flex-1 h-[10px] rounded-[100px] overflow-hidden"
            style={{ background: bg, boxShadow: step === 'glow' ? '0 0 12px rgba(0,214,118,0.8)' : undefined }}
          >
            <div className="absolute" style={{ background: inner,   inset: '4.55px 2px 1.45px', borderRadius: '300px 300px 50px 50px' }} />
            <div className="absolute" style={{ background: shimmer, inset: '1.55px 2px 4.45px', borderRadius: '50px 50px 300px 300px' }} />
          </div>
        );
      })}
    </div>
  );
}
