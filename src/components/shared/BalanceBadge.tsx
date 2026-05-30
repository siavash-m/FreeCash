export default function BalanceBadge({ balance }: { balance: string }) {
  return (
    <div data-animate="balance-badge" className="flex items-center justify-center">
      <div
        className="flex gap-[8px] items-center pl-[14px] pr-[20px] py-[4px] rounded-[40px]"
        style={{ background: '#00403c', filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.25))' }}
      >
        <div className="flex h-[34px] items-center justify-center w-[43px]">
          <div style={{ transform: 'rotate(10.03deg)' }}>
            <img alt="" src="/assets/balance-badge.svg" style={{ width: 38.8, height: 27.6, display: 'block' }} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>
          <p className="text-[10px] uppercase tracking-wide" style={{ color: '#71ffbf', textShadow: '0 0.8px 0 black' }}>Balance</p>
          <p className="text-[14px] tracking-[0.42px]" style={{ color: 'white', textShadow: '0 1px 0 black' }}>{balance}</p>
        </div>
      </div>
    </div>
  );
}
