type Props = { onContinue: () => void };

const RING_LAYERS = [
  { src: '/assets/hook-ellipse25.svg', size: 321,     offset: 0      },
  { src: '/assets/hook-ellipse24.svg', size: 291.445, offset: 14.78  },
  { src: '/assets/hook-ellipse23.svg', size: 263.532, offset: 28.73  },
  { src: '/assets/hook-ellipse22.svg', size: 235.619, offset: 42.69  },
  { src: '/assets/hook-ellipse26.svg', size: 201.138, offset: 59.93  },
  { src: '/assets/hook-ellipse21.svg', size: 201.138, offset: 59.93  },
  { src: '/assets/hook-ellipse28.svg', size: 165.015, offset: 77.99  },
];

const FLOATING_BADGES = [
  { amount: '+ $300',  label: 'Cash out',  avatar: '/assets/hook-avatar1.png', left: 203.6,  top: 42.69,  avatarLeft: true  },
  { amount: '+ $600',  label: 'Cash out',  avatar: '/assets/hook-avatar2.png', left: 216.74, top: 197.03, avatarLeft: true  },
  { amount: '+ $1200', label: 'Play game', avatar: '/assets/hook-avatar3.png', left: -41.87, top: 74.71,  avatarLeft: false },
  { amount: '+ $2000', label: 'Bonus',     avatar: '/assets/hook-avatar4.png', left: 15.6,   top: 243.01, avatarLeft: false },
];

const STEPS = [
  { label: 'Create account',     reward: '+ $1.00', done: true  },
  { label: 'Add to home screen', reward: '+ $1.00', done: true  },
  { label: 'Personalize profile',reward: '+ $1.00', done: false },
];

export default function HookPage({ onContinue }: Props) {
  return (
    <div
      className="relative flex flex-col overflow-hidden overflow-y-auto"
      style={{ background: '#141523', width: 402, minHeight: 870, borderRadius: 16 }}
    >
      <div className="flex flex-1 flex-col gap-[40px] items-center justify-end px-[18px] py-[48px]">

        {/* Headline */}
        <div data-animate="headline" className="flex flex-col gap-[4px] items-start w-full">
          <p className="text-[16px] text-center w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            <span style={{ color: '#00d676' }}>$6,439,190</span>
            <span style={{ color: '#a9a9ca' }}> Paid out today</span>
          </p>
          <p className="text-[24px] text-white w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Let's earn your first $5.
          </p>
        </div>

        {/* Circle graphic */}
        <div data-animate="circle-graphic" className="relative shrink-0" style={{ width: 322, height: 321 }}>
          {/* Concentric rings */}
          {RING_LAYERS.map((ring, i) => (
            <div key={i} className="absolute" style={{ left: ring.offset, top: ring.offset, width: ring.size, height: ring.size }}>
              <img alt="" src={ring.src} className="block w-full h-full" />
            </div>
          ))}
          {/* Arc overlays inside ellipse28 */}
          <div className="absolute" style={{ left: 77.99, top: 77.99, width: 165.015, height: 165.015 }}>
            <div className="absolute" style={{ inset: '2.93% 8.77% 73.57% 62.71%' }}>
              <img alt="" src="/assets/hook-ellipse29.svg" className="block w-full h-full" />
            </div>
          </div>
          <div className="absolute" style={{ left: 77.99, top: 77.99, width: 165.015, height: 165.015 }}>
            <div className="absolute" style={{ inset: '-9.02% 0 65.04% 40.85%' }}>
              <img alt="" src="/assets/hook-ellipse30.svg" className="block w-full h-full" />
            </div>
          </div>

          {/* Floating income badges */}
          {FLOATING_BADGES.map((badge, i) => (
            <div
              key={i}
              className="absolute flex gap-[11.5px] items-center rounded-[164px] px-[6.6px] py-[3.3px]"
              style={{ background: '#33334d', filter: 'drop-shadow(0 0 3.3px rgba(0,214,118,0.24))', left: badge.left, top: badge.top, width: 123.967, flexDirection: badge.avatarLeft ? 'row' : 'row-reverse' }}
            >
              <img alt="" src={badge.avatar} style={{ width: 34.5, height: 34.5, borderRadius: '50%', flexShrink: 0 }} />
              <div className="flex flex-col items-start">
                <p className="text-[12px] whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#00d676' }}>{badge.amount}</p>
                <p className="text-[10px] whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#cbcbde' }}>{badge.label}</p>
              </div>
            </div>
          ))}

          {/* Center $5 */}
          <div className="absolute flex flex-col items-center" style={{ left: 135, top: 122, width: 51.7, fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            <p className="text-[40px] whitespace-nowrap" style={{ color: '#00da6b' }}>$5</p>
            <p className="text-[10px] text-center w-full" style={{ color: '#a9a9ca' }}>First goal</p>
          </div>
        </div>

        {/* Earning path + CTA */}
        <div data-animate="earning-path" className="flex flex-col gap-[40px] items-start justify-end w-full">
          {/* Steps */}
          <div className="flex flex-col gap-[8px] items-start px-[24px] w-full">
            <p className="text-[12px] text-center w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#a9a9ca' }}>
              Your earning path
            </p>
            <div className="flex gap-[8px] items-start w-full">
              {/* Timeline icons */}
              <div className="flex flex-col items-center self-stretch w-[18px]">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    {i === 0 && <div style={{ height: 16 }} />}
                    <div className="relative shrink-0" style={{ width: 13.3, height: 13.3 }}>
                      <img alt="" src={step.done ? '/assets/hook-check-done.svg' : '/assets/hook-check-todo.svg'} className="block w-full h-full" />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="flex-1 w-[1px]" style={{ background: step.done ? '#00da6b' : '#525268', minHeight: 8 }} />
                    )}
                    {i === STEPS.length - 1 && <div style={{ height: 16 }} />}
                  </div>
                ))}
              </div>
              {/* Step rows */}
              <div className="flex flex-1 flex-col gap-[8px]">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex items-center w-full">
                    <div
                      className="flex flex-1 gap-[10px] items-center justify-center px-[20px] py-[12px] rounded-[8px] text-[14px]"
                      style={{ background: '#141523', border: `1px solid ${step.done ? '#00da6b' : '#525268'}` }}
                    >
                      <p className="flex-1 min-w-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: 'white' }}>{step.label}</p>
                      <p className="whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#00da6b' }}>{step.reward}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            data-animate="cta-button"
            onClick={onContinue}
            className="relative flex gap-[10px] items-center justify-center px-[16px] py-[12px] rounded-[6px] w-full border-0 cursor-pointer overflow-hidden"
            style={{ background: '#00da6b', boxShadow: '0 -6px 0 0 #71ffbf, 0 4px 0 0 #00984c' }}
          >
            <span className="text-[16px] whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#141524' }}>
              Continue earning
            </span>
            <img alt="" src="/assets/hook-arrow.svg" style={{ width: 24, height: 24 }} />
            <div className="absolute" style={{ top: 4, right: 4, width: 19, height: 15, pointerEvents: 'none' }}>
              <img alt="" className="block w-full h-full" src="/assets/hook-shine.svg" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
