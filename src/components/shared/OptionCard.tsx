import type { Option } from '../../types';

type Props = {
  option: Option;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

export default function OptionCard({ option, selected, disabled, onClick }: Props) {
  return (
    <button
      data-animate={`card-${option.id}`}
      data-selected={selected}
      onClick={disabled ? undefined : onClick}
      className="relative flex gap-[10px] items-center justify-center rounded-[10px] w-full text-left border-0 cursor-pointer overflow-hidden transition-all duration-200"
      style={{
        background: selected ? '#00da6b' : '#1d1e30',
        boxShadow: selected
          ? '0px -6px 0px 0px #71ffbf, 0px 4px 0px 0px #00984c'
          : '0px -6px 0px 0px #33334d, 0px 6px 0px 0px #0f0f1a',
        padding: selected ? '32px 20px' : '24px 20px',
        opacity: disabled && !selected ? 0.6 : 1,
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
          <p className="text-[10px] w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: selected ? 600 : 400, color: selected ? '#1d1e30' : '#a9a9ca' }}>
            {option.label}
          </p>
          <p className="text-[18px] w-full leading-tight" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: selected ? 800 : 700, color: selected ? '#141523' : 'white' }}>
            {option.title}
          </p>
        </div>
      </div>
      {/* shine corner */}
      <div className="absolute" style={{ top: 4, right: 4, width: 26, height: 20, pointerEvents: 'none' }}>
        <img alt="" className="block w-full h-full" src={selected ? '/assets/shine-paypal.svg' : '/assets/shine-dark.svg'} />
      </div>
    </button>
  );
}
