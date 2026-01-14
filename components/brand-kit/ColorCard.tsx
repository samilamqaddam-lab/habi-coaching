'use client';

import { useState } from 'react';

interface ColorCardProps {
  name: string;
  hex: string;
  usage: string;
  className?: string;
}

export default function ColorCard({ name, hex, usage, className = '' }: ColorCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Determine if text should be light or dark based on background
  const isLightColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const textColor = isLightColor(hex) ? 'text-gray-800' : 'text-white';
  const textColorMuted = isLightColor(hex) ? 'text-gray-600' : 'text-white/70';

  return (
    <button
      onClick={copyToClipboard}
      className={`group relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--golden-orange)] ${className}`}
      style={{ backgroundColor: hex }}
      aria-label={`Copier ${hex}`}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Content */}
      <div className={`absolute inset-0 p-4 flex flex-col justify-between ${textColor}`}>
        <div className="text-left">
          <p className="font-medium text-sm">{name}</p>
          <p className={`text-xs mt-0.5 ${textColorMuted}`}>{usage}</p>
        </div>

        <div className="flex items-end justify-between">
          <span className="font-mono text-sm opacity-80 group-hover:opacity-100 transition-opacity">
            {hex}
          </span>

          {/* Copy indicator */}
          <span className={`text-xs px-2 py-1 rounded-md transition-all duration-200 ${
            copied
              ? 'bg-green-500 text-white opacity-100'
              : 'bg-black/20 opacity-0 group-hover:opacity-100'
          }`}>
            {copied ? 'Copié!' : 'Cliquer pour copier'}
          </span>
        </div>
      </div>
    </button>
  );
}
