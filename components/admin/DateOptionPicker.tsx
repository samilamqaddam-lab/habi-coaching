'use client';

import { DateOptionData } from './SessionBuilder';

interface DateOptionPickerProps {
  dateOptions: DateOptionData[];
  onChange: (dateOptions: DateOptionData[]) => void;
  defaultCapacity: number;
}

export default function DateOptionPicker({
  dateOptions,
  onChange,
  defaultCapacity,
}: DateOptionPickerProps) {
  const addDateOption = () => {
    onChange([
      ...dateOptions,
      {
        dateTime: '',
        location: 'Studio, Casablanca',
        maxCapacity: defaultCapacity,
      },
    ]);
  };

  const removeDateOption = (index: number) => {
    if (dateOptions.length <= 1) {
      alert('Vous devez avoir au moins une option de date');
      return;
    }
    onChange(dateOptions.filter((_, i) => i !== index));
  };

  const updateDateOption = (index: number, updates: Partial<DateOptionData>) => {
    onChange(
      dateOptions.map((option, i) =>
        i === index ? { ...option, ...updates } : option
      )
    );
  };

  const formatDateTimeLocal = (isoString: string): string => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      // Format as YYYY-MM-DDTHH:mm for datetime-local input
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return '';
    }
  };

  const handleDateTimeChange = (index: number, localValue: string) => {
    if (!localValue) {
      updateDateOption(index, { dateTime: '' });
      return;
    }
    // Convert local datetime to ISO string
    const date = new Date(localValue);
    updateDateOption(index, { dateTime: date.toISOString() });
  };

  return (
    <div className="space-y-3">
      {dateOptions.map((option, index) => (
        <div
          key={option.id || `date-${index}`}
          className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700"
        >
          <div className="w-8 h-8 bg-slate-700 text-slate-400 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-1">
            {index + 1}
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Date/Time */}
            <div>
              <label className="block text-xs text-slate-500 mb-1">Date et heure *</label>
              <input
                type="datetime-local"
                value={formatDateTimeLocal(option.dateTime)}
                onChange={(e) => handleDateTimeChange(index, e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs text-slate-500 mb-1">Lieu</label>
              <input
                type="text"
                value={option.location}
                onChange={(e) => updateDateOption(index, { location: e.target.value })}
                placeholder="Studio, Casablanca"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-xs text-slate-500 mb-1">Capacité</label>
              <input
                type="number"
                value={option.maxCapacity ?? defaultCapacity}
                onChange={(e) => updateDateOption(index, { maxCapacity: parseInt(e.target.value) || defaultCapacity })}
                min={1}
                max={100}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => removeDateOption(index)}
            className="p-2 text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
            title="Supprimer cette date"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {/* Add Date Option Button */}
      <button
        type="button"
        onClick={addDateOption}
        className="w-full py-2 border border-dashed border-slate-600 rounded-lg text-slate-500 hover:border-orange-400 hover:text-orange-400 transition-colors text-sm flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une date alternative
      </button>
    </div>
  );
}
