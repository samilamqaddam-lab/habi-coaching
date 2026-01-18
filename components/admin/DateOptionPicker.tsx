'use client';

import { DateOptionData, formatDuration, calculateDurationFromTimes, calculatePriceFromMinutes } from './SessionBuilder';
import TimeInput24h from './TimeInput24h';

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
    // Copy times from first option if available
    const firstOption = dateOptions[0];
    onChange([
      ...dateOptions,
      {
        date: '',
        startTime: firstOption?.startTime || '',
        endTime: firstOption?.endTime || '',
        location: firstOption?.location || 'Studio, Casablanca',
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

  // Sync times across all date options when first option's times change
  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    if (index === 0) {
      // Update all options with the same time
      onChange(
        dateOptions.map((option, i) => ({
          ...option,
          [field]: value,
        }))
      );
    } else {
      updateDateOption(index, { [field]: value });
    }
  };

  // Calculate reference duration from first option
  const firstOption = dateOptions[0];
  const referenceDuration = firstOption
    ? calculateDurationFromTimes(firstOption.startTime, firstOption.endTime)
    : 0;

  // Helper to check if an option has duration mismatch
  const hasDurationMismatch = (option: DateOptionData, index: number): boolean => {
    if (index === 0 || referenceDuration === 0) return false;
    const optionDuration = calculateDurationFromTimes(option.startTime, option.endTime);
    return optionDuration > 0 && optionDuration !== referenceDuration;
  };

  return (
    <div className="space-y-3">
      {/* Duration info banner */}
      {referenceDuration > 0 && (
        <div className="bg-slate-700/50 rounded-lg px-4 py-2 flex items-center justify-between">
          <span className="text-sm text-slate-300">
            Durée de la session: <span className="font-medium text-slate-100">{formatDuration(referenceDuration)}</span>
          </span>
          <span className="text-sm text-green-400 font-medium">
            {calculatePriceFromMinutes(referenceDuration)} DH
          </span>
        </div>
      )}

      {dateOptions.map((option, index) => {
        const mismatch = hasDurationMismatch(option, index);
        const optionDuration = calculateDurationFromTimes(option.startTime, option.endTime);

        return (
        <div
          key={option.id || `date-${index}`}
          className={`p-3 bg-slate-800 rounded-lg border ${mismatch ? 'border-red-500' : 'border-slate-700'}`}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-slate-700 text-slate-400 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-1">
              {index + 1}
            </div>

            <div className="flex-1 space-y-3">
              {/* First row: Date and Times */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Date */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Date *</label>
                  <input
                    type="date"
                    value={option.date || ''}
                    onChange={(e) => updateDateOption(index, { date: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    Heure de début *
                  </label>
                  <TimeInput24h
                    value={option.startTime || ''}
                    onChange={(value) => handleTimeChange(index, 'startTime', value)}
                  />
                  {index === 0 && (
                    <p className="text-xs text-orange-400 mt-1">Appliqué à toutes les dates</p>
                  )}
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    Heure de fin *
                  </label>
                  <TimeInput24h
                    value={option.endTime || ''}
                    onChange={(value) => handleTimeChange(index, 'endTime', value)}
                  />
                  {index === 0 && (
                    <p className="text-xs text-orange-400 mt-1">Appliqué à toutes les dates</p>
                  )}
                </div>
              </div>

              {/* Second row: Location and Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

          {/* Duration mismatch error */}
          {mismatch && (
            <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Durée différente: {formatDuration(optionDuration)} (attendu: {formatDuration(referenceDuration)})
            </p>
          )}
        </div>
        );
      })}

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
