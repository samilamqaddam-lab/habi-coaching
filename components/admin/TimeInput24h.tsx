'use client';

interface TimeInput24hProps {
  value: string;  // Format "HH:mm"
  onChange: (value: string) => void;
  className?: string;
}

export default function TimeInput24h({ value, onChange, className }: TimeInput24hProps) {
  const [hours, minutes] = (value || '').split(':').map(s => s || '');

  const handleHoursChange = (h: string) => {
    const hrs = Math.min(23, Math.max(0, parseInt(h) || 0));
    onChange(`${hrs.toString().padStart(2, '0')}:${minutes || '00'}`);
  };

  const handleMinutesChange = (m: string) => {
    const mins = Math.min(59, Math.max(0, parseInt(m) || 0));
    onChange(`${hours || '00'}:${mins.toString().padStart(2, '0')}`);
  };

  return (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      <input
        type="number"
        min={0}
        max={23}
        value={hours}
        onChange={(e) => handleHoursChange(e.target.value)}
        placeholder="00"
        className="w-14 bg-slate-700 border border-slate-600 rounded-lg px-2 py-2 text-slate-100 text-sm text-center focus:outline-none focus:border-orange-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <span className="text-slate-400 font-medium">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={minutes}
        onChange={(e) => handleMinutesChange(e.target.value)}
        placeholder="00"
        className="w-14 bg-slate-700 border border-slate-600 rounded-lg px-2 py-2 text-slate-100 text-sm text-center focus:outline-none focus:border-orange-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}
