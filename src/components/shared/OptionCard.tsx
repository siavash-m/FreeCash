import type { Option } from '../../types';

type Props = {
  option: Option;
  /** Newly selected this visit (green fill) */
  selected: boolean;
  /** Was selected on a previous visit (green border, dark bg) */
  previouslySelected: boolean;
  disabled: boolean;
  onClick: () => void;
};

export default function OptionCard({ option, selected, previouslySelected, disabled, onClick }: Props) {
  const isActive = selected || previouslySelected;

  let bg = '#1d1e30';
  let shadow = '0px -6px 0px 0px #33334d, 0px 6px 0px 0px #0f0f1a';
  let border: string | undefined;

  if (selected) {
    bg = '#00da6b';
    shadow = '0px -6px 0px 0px #71ffbf, 0px 4px 0px 0px #00984c';
  } else if (previouslySelected) {
    // Dark bg + green side borders + green shadow (from Figma "Back from 3rd STEPPER")
    shadow = '0px -6px 0px 0px #71ffbf, 0px 4px 0px 0px #00984c';
    border = '4px solid #00da6b';
  }

  return (
    <button
      data-animate={`card-${option.id}`}
      data-selected={selected}
      data-previously-selected={previouslySelected}
      onClick={disabled ? undefined : onClick}
      className="relative flex gap-[10px] items-center justify-center rounded-[10px] w-full text-left border-0 cursor-pointer overflow-hidden transition-colors duration-200"
      style={{ background: bg, boxShadow: shadow, padding: '24px 20px', opacity: disabled && !isActive ? 0.6 : 1,
        ...(border ? { borderLeft: border, borderRight: border } : {}),
      }}
    >
      <div className="flex flex-1 flex-col gap-[10px] items-start justify-center min-w-0">
        {/* icon */}
        <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
          <img
            alt={option.iconAlt}
            src={option.icon}
            className="absolute block inset-0 max-w-none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {/* label + title */}
        <div className="flex flex-col items-start w-full">
          <p className="text-[10px] w-full" style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: selected ? 600 : 400,
            color: selected ? '#1d1e30' : '#a9a9ca',
          }}>
            {option.label}
          </p>
          <p className="text-[18px] w-full leading-tight" style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: selected ? 800 : 700,
            color: selected ? '#141523' : 'white',
          }}>
            {option.title}
          </p>
        </div>
      </div>
      {/* shine corner */}
      <div className="absolute" style={{ top: 4, right: 4, width: 26, height: 20, pointerEvents: 'none' }}>
        <img alt="" className="block w-full h-full"
          src={selected ? '/assets/shine-paypal.svg' : '/assets/shine-dark.svg'} />
      </div>
    </button>
  );
}
