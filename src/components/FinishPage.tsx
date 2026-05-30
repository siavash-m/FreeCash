type Props = { onSkip: () => void };

const RING_LAYERS = [
  { src: '/assets/finish-ellipse25.svg', size: 321,     offset: 0      },
  { src: '/assets/finish-ellipse24.svg', size: 291.445, offset: 14.78  },
  { src: '/assets/finish-ellipse23.svg', size: 263.532, offset: 28.73  },
  { src: '/assets/finish-ellipse22.svg', size: 235.619, offset: 42.69  },
  { src: '/assets/finish-ellipse26.svg', size: 201.138, offset: 59.93  },
  { src: '/assets/finish-ellipse21.svg', size: 201.138, offset: 59.93  },
  { src: '/assets/finish-ellipse28.svg', size: 165.015, offset: 77.99  },
];

const PATH_STEPS = [
  { label: 'Onboarding',     reward: '+ $5.00',  lineColor: '#00da6b', checkSrc: '/assets/finish-check-green.svg',  borderColor: '#00da6b', rewardColor: '#00da6b' },
  { label: 'Play first game',reward: '+ $10.00', lineColor: '#fee810', checkSrc: '/assets/finish-check-yellow.svg', borderColor: '#fee810', rewardColor: '#fee810' },
  { label: 'First cash-out', reward: '+ $15.00', lineColor: '#525268', checkSrc: '/assets/finish-check-gray.svg',   borderColor: '#525268', rewardColor: '#00da6b' },
];

export default function FinishPage({ onSkip }: Props) {
  return (
    <div
      className="relative flex flex-col overflow-hidden overflow-y-auto"
      style={{ background: '#141523', width: 402, minHeight: 870, borderRadius: 16 }}
    >
      <div className="flex flex-1 flex-col gap-[24px] items-center px-[18px] py-[48px]">

        {/* Title */}
        <div data-animate="finish-title" className="flex flex-col gap-[4px] items-start text-center w-full">
          <p className="text-[24px] w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#fee810' }}>
            You reached first goal!
          </p>
          <p className="text-[16px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#a9a9ca', width: 337 }}>
            Start earning more by play first game.
          </p>
        </div>

        {/* Circle graphic */}
        <div data-animate="circle-graphic" className="relative shrink-0" style={{ width: 322, height: 321 }}>
          {RING_LAYERS.map((ring, i) => (
            <div key={i} className="absolute" style={{ left: ring.offset, top: ring.offset, width: ring.size, height: ring.size }}>
              <img alt="" src={ring.src} className="block w-full h-full" />
            </div>
          ))}
          <div className="absolute" style={{ left: 77.99, top: 77.99, width: 165.015, height: 165.015 }}>
            <div className="absolute" style={{ inset: '2.93% 8.77% 73.57% 62.71%' }}>
              <img alt="" src="/assets/finish-ellipse29.svg" className="block w-full h-full" />
            </div>
          </div>
          <div className="absolute" style={{ left: 77.99, top: 77.99, width: 165.015, height: 165.015 }}>
            <div className="absolute" style={{ inset: '-9.15%' }}>
              <img alt="" src="/assets/finish-ellipse30.svg" className="block w-full h-full" />
            </div>
          </div>
          {/* Center $5 */}
          <div className="absolute flex flex-col items-center" style={{ left: 135, top: 122, width: 51.7, fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            <p className="text-[40px] whitespace-nowrap" style={{ color: '#fee810' }}>$5</p>
            <p className="text-[10px] text-center" style={{ color: '#a9a9ca' }}>Completed</p>
          </div>
        </div>

        {/* Earning path */}
        <div data-animate="earning-path" className="flex flex-col items-start justify-end pb-[24px] w-full">
          <div className="flex flex-col gap-[8px] items-start px-[24px] w-full">
            <p className="text-[12px] text-center w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#a9a9ca' }}>
              Your earning path
            </p>
            <div className="flex gap-[8px] items-start w-full">
              {/* Timeline */}
              <div className="flex flex-col items-center self-stretch w-[18px]">
                {PATH_STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    {i === 0 && <div style={{ height: 16 }} />}
                    <div className="relative shrink-0" style={{ width: i === 0 ? 13.3 : 16, height: i === 0 ? 13.3 : 16 }}>
                      <img alt="" src={step.checkSrc} className="block w-full h-full" />
                    </div>
                    {i < PATH_STEPS.length - 1 && (
                      <div className="flex-1 w-[1px]" style={{ background: step.lineColor, minHeight: 8 }} />
                    )}
                    {i === PATH_STEPS.length - 1 && <div style={{ height: 16 }} />}
                  </div>
                ))}
              </div>
              {/* Rows */}
              <div className="flex flex-1 flex-col gap-[8px]">
                {PATH_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center w-full">
                    <div
                      className="flex flex-1 gap-[10px] items-center justify-center px-[20px] py-[12px] rounded-[8px] text-[14px]"
                      style={{ background: '#141523', border: `1px solid ${step.borderColor}` }}
                    >
                      <p className="flex-1 min-w-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: 'white' }}>{step.label}</p>
                      <p className="whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: step.rewardColor }}>{step.reward}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Game card */}
        <div data-animate="game-card" className="relative flex flex-col items-center w-full" style={{ maxWidth: 366 }}>
          {/* Recommended badge */}
          <div
            className="absolute flex gap-[6px] items-center px-[8px] py-[4px] rounded-[15px] z-10"
            style={{ top: -12, left: 26, background: 'linear-gradient(-10deg, #fdf055 42%, #fee810 60%)', boxShadow: '0 0 7.5px rgba(254,232,16,0.7)' }}
          >
            <img alt="" src="/assets/finish-editor-badge.svg" style={{ width: 14, height: 14 }} />
            <p className="text-[10px] whitespace-nowrap text-black" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              RECOMMENDED FOR YOU
            </p>
          </div>

          {/* Game screenshot */}
          <div className="relative w-full overflow-hidden rounded-tl-[16px] rounded-tr-[16px]" style={{ height: 210 }}>
            <img alt="game" src="/assets/finish-game-bg.png" className="absolute block" style={{ width: '120.06%', left: '-9.98%', top: '-152.33%', maxWidth: 'none' }} />
            {/* Rating badge */}
            <div
              className="absolute flex gap-[1px] items-center p-[4px] rounded-[6px]"
              style={{ top: 15, right: 4, backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.02)' }}
            >
              <img alt="" src="/assets/finish-ios-star.png" style={{ width: 16, height: 16 }} />
              <p className="text-[10px] text-white whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>4.6</p>
              <img alt="" src="/assets/finish-star.svg" style={{ width: 14, height: 14 }} />
            </div>
            {/* Game name overlay */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: 89, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', backdropFilter: 'blur(15px)' }}
            />
            <div className="absolute flex gap-[14px] items-end" style={{ left: 16, bottom: 16, width: 310 }}>
              <div className="relative shrink-0 overflow-hidden rounded-[8px]" style={{ width: 53, height: 53 }}>
                <img alt="game icon" src="/assets/finish-game-icon.png" className="absolute block" style={{ width: '334.94%', left: '-17.05%', top: '-105.11%', maxWidth: 'none' }} />
              </div>
              <p className="text-[18px] text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, width: 255 }}>
                HomeSpaces: Match 3 Games
              </p>
            </div>
          </div>

          {/* Game details */}
          <div
            className="flex flex-col gap-[14px] items-start w-full overflow-hidden pb-[24px] pt-[18px] px-[18px] rounded-bl-[16px] rounded-br-[16px]"
            style={{ border: '1px solid #525268', borderTop: 'none' }}
          >
            {/* Tags */}
            <div className="flex gap-[6px] items-start">
              {[
                { icon: '/assets/finish-casual-icon.svg', label: 'Casual' },
                { icon: '/assets/finish-time-icon.svg', label: '5 min play' },
              ].map((tag) => (
                <div key={tag.label} className="flex gap-[6px] items-center px-[8px] py-[4px] rounded-[24px]" style={{ background: '#525268' }}>
                  <img alt="" src={tag.icon} style={{ width: 14, height: 14 }} />
                  <p className="text-[12px] text-white whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>{tag.label}</p>
                </div>
              ))}
            </div>

            {/* Reward */}
            <div className="flex flex-col items-start pb-[6px]">
              <p className="text-[18px] text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Your reward:</p>
              <p className="text-[32px] whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#fee810' }}>+$10.00</p>
            </div>

            {/* Start button */}
            <button
              className="relative flex gap-[10px] items-center justify-center px-[16px] py-[12px] rounded-[6px] w-full border-0 cursor-pointer overflow-hidden"
              style={{ background: '#00da6b', boxShadow: '0 -6px 0 0 #71ffbf, 0 4px 0 0 #00984c' }}
            >
              <span className="text-[16px] whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#141524' }}>
                Start first game
              </span>
              <img alt="" src="/assets/finish-arrow.svg" style={{ width: 24, height: 24 }} />
              <div className="absolute" style={{ top: 4, right: 4, width: 19, height: 15, pointerEvents: 'none' }}>
                <img alt="" className="block w-full h-full" src="/assets/finish-shine-green.svg" />
              </div>
            </button>
          </div>
        </div>

        {/* Skip */}
        <button
          data-animate="skip-button"
          onClick={onSkip}
          className="relative flex gap-[10px] items-center justify-center px-[16px] py-[12px] rounded-[6px] w-full border-0 cursor-pointer overflow-hidden"
          style={{ background: '#525268', boxShadow: '0 -6px 0 0 #7d7d9e, 0 4px 0 0 #33334d' }}
        >
          <span className="text-[16px] text-white whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Skip</span>
          <div className="absolute" style={{ top: 4, right: 4, width: 26, height: 20, pointerEvents: 'none' }}>
            <img alt="" className="block w-full h-full" src="/assets/finish-shine-dark.svg" />
          </div>
        </button>
      </div>
    </div>
  );
}
