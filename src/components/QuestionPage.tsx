import { useState, useEffect } from 'react';
import type { Question, ProgressStep } from '../types';
import ProgressBar from './shared/ProgressBar';
import BalanceBadge from './shared/BalanceBadge';
import OptionCard from './shared/OptionCard';

type Props = {
  question: Question;
  progress: ProgressStep[];
  /** Option the user selected on a previous visit to this question */
  previousSelectionId: string | null;
  /** True when the user navigated here via the back button */
  isGoingBack: boolean;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
};

const ADVANCE_DELAY_MS = 800;

export default function QuestionPage({
  question, progress, previousSelectionId, isGoingBack,
  onNext, onSkip, onBack,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Reset fresh selection when question changes
  useEffect(() => { setSelectedId(null); }, [question]);

  function handleSelect(id: string) {
    if (selectedId !== null) return; // already mid-transition
    setSelectedId(id);
    setTimeout(onNext, ADVANCE_DELAY_MS);
  }

  const isTransitioning = selectedId !== null;
  // Show Next button when going back and a previous answer exists
  const showNextButton = isGoingBack && previousSelectionId !== null;

  return (
    <div
      data-animate="question-page"
      className="relative flex flex-col overflow-hidden"
      style={{ background: '#141523', width: 402, height: 870, borderRadius: 16 }}
    >
      {/* ── Header ── */}
      <div
        data-animate="header"
        className="flex flex-col items-start shrink-0 pb-[24px] pt-[48px] px-[24px]"
        style={{ background: '#1d1e30' }}
      >
        <div className="flex flex-col gap-[14px] items-center w-full">
          <div className="flex gap-[10px] items-center w-full">
            {question.showBack ? (
              <div className="flex flex-1 items-center">
                <button
                  onClick={onBack}
                  className="flex items-center justify-center border-0 cursor-pointer rounded-[6px] p-[4px]"
                  style={{ background: '#525268', boxShadow: '0 4px 0 #33334d', width: 32, height: 32 }}
                  aria-label="Go back"
                >
                  <img
                    alt=""
                    src="/assets/arrow-forward.svg"
                    style={{ width: 24, height: 24, transform: 'scaleY(-1) rotate(180deg)' }}
                  />
                </button>
              </div>
            ) : (
              <div className="flex-1" />
            )}
            <BalanceBadge balance={question.balance} />
            <div className="flex-1" />
          </div>

          <div className="flex flex-col gap-[2px] items-start w-full">
            <div
              className="flex items-center justify-between w-full text-[14px] tracking-[0.42px]"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}
            >
              <span style={{ color: 'white',   textShadow: '0 1px 0 black' }}>$0</span>
              <span style={{ color: '#00da6b', textShadow: '0 1px 0 black' }}>$5</span>
            </div>
            <ProgressBar steps={progress} />
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col items-center justify-between pb-[48px] pt-[20px] px-[18px]">
        {/* Headline */}
        <div data-animate="headline" className="flex flex-col gap-[18px] items-start px-[18px] w-full">
          <p className="text-[24px] w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: 'white' }}>
            {question.title}
          </p>
          <div className="flex flex-col gap-[6px] items-start w-full">
            <p className="text-[16px] w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#a9a9ca' }}>
              {question.subtitle}
            </p>
            <p className="text-[10px] w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: '#a9a9ca' }}>
              You can always change it later
            </p>
          </div>
        </div>

        {/* 2×2 grid */}
        <div
          data-animate="cards-grid"
          className="grid grid-cols-2 gap-[24px] w-full"
          style={{ height: 296 }}
        >
          {question.options.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              selected={selectedId === opt.id}
              previouslySelected={
                selectedId === null &&          // no new pick yet
                isGoingBack &&                   // going back mode
                previousSelectionId === opt.id  // this was the old pick
              }
              disabled={isTransitioning}
              onClick={() => handleSelect(opt.id)}
            />
          ))}
        </div>

        {/* Bottom buttons */}
        <div
          data-animate="skip-button"
          className="flex flex-col justify-end w-full"
          style={{ height: 112, gap: showNextButton ? 20 : 0 }}
        >
          {/* Skip */}
          <button
            onClick={isTransitioning ? undefined : onSkip}
            className="relative flex gap-[10px] items-center justify-center px-[16px] py-[12px] rounded-[6px] w-full border-0 overflow-hidden cursor-pointer"
            style={{ background: '#525268', boxShadow: '0 -6px 0 0 #7d7d9e, 0 4px 0 0 #33334d' }}
          >
            <span className="text-white text-[16px] whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Skip
            </span>
            <div className="absolute" style={{ top: 4, right: 4, width: 26, height: 20, pointerEvents: 'none' }}>
              <img alt="" className="block w-full h-full" src="/assets/shine-gray.svg" />
            </div>
          </button>

          {/* Next — only visible when going back with a previous answer */}
          {showNextButton && (
            <button
              data-animate="next-button"
              onClick={isTransitioning ? undefined : onNext}
              className="relative flex gap-[10px] items-center justify-center px-[16px] py-[12px] rounded-[6px] w-full border-0 overflow-hidden cursor-pointer"
              style={{ background: '#00da6b', boxShadow: '0 -6px 0 0 #71ffbf, 0 4px 0 0 #00984c' }}
            >
              <span className="text-[16px] whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#141524' }}>
                Next
              </span>
              <img alt="" src="/assets/next-arrow.svg" style={{ width: 24, height: 24 }} />
              <div className="absolute" style={{ top: 4, right: 4, width: 19, height: 15, pointerEvents: 'none' }}>
                <img alt="" className="block w-full h-full" src="/assets/shine-next.svg" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
