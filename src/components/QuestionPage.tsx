import { useState, useEffect } from 'react';
import type { Question } from '../types';
import ProgressBar from './shared/ProgressBar';
import BalanceBadge from './shared/BalanceBadge';
import OptionCard from './shared/OptionCard';

type Props = {
  question: Question;
  onNext: () => void;
  onBack: () => void;
};

const ADVANCE_DELAY_MS = 800;

export default function QuestionPage({ question, onNext, onBack }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Reset selection when question changes
  useEffect(() => { setSelectedId(null); }, [question]);

  function handleSelect(id: string) {
    if (selectedId !== null) return; // already selected, wait for transition
    setSelectedId(id);
    setTimeout(onNext, ADVANCE_DELAY_MS);
  }

  const isTransitioning = selectedId !== null;

  return (
    <div
      data-animate="question-page"
      className="relative flex flex-col overflow-hidden"
      style={{ background: '#141523', width: 402, height: 870, borderRadius: 16 }}
    >
      {/* Header */}
      <div
        data-animate="header"
        className="flex flex-col items-start shrink-0 pb-[24px] pt-[48px] px-[24px]"
        style={{ background: '#1d1e30' }}
      >
        <div className="flex flex-col gap-[14px] items-center w-full">
          {/* Top row: back button (optional) + balance badge + spacer */}
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
                    style={{ width: 24, height: 24, transform: 'rotate(180deg)' }}
                  />
                </button>
              </div>
            ) : (
              <div className="flex-1" />
            )}
            <BalanceBadge balance={question.balance} />
            <div className="flex-1" />
          </div>

          {/* Range labels + progress bar */}
          <div className="flex flex-col gap-[2px] items-start w-full">
            <div className="flex items-center justify-between w-full text-[14px] tracking-[0.42px]"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>
              <span style={{ color: 'white', textShadow: '0 1px 0 black' }}>$0</span>
              <span style={{ color: '#00da6b', textShadow: '0 1px 0 black' }}>$5</span>
            </div>
            <ProgressBar steps={question.progress} />
          </div>
        </div>
      </div>

      {/* Body */}
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

        {/* 2×2 option grid */}
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
              disabled={isTransitioning}
              onClick={() => handleSelect(opt.id)}
            />
          ))}
        </div>

        {/* Skip */}
        <div className="flex flex-col justify-end w-full" style={{ height: 112 }}>
          <button
            data-animate="skip-button"
            onClick={isTransitioning ? undefined : onNext}
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
        </div>
      </div>
    </div>
  );
}
