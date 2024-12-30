import React from 'react';

export function SeatLegend() {
  return (
    <div className="flex justify-center gap-8 py-6 border-t border-gray-100">
      <LegendItem color="bg-gray-200" label="Available" />
      <LegendItem color="bg-blue-600" label="Selected" />
      <LegendItem color="bg-gray-400 opacity-50" label="Reserved" />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`
        w-8 h-10
        ${color}
        rounded-t-xl
        shadow-md
        relative
      `}>
        <div className="absolute bottom-0 left-0.5 right-0.5 h-1.5 bg-black bg-opacity-20 rounded-b-sm" />
      </div>
      <span className="text-sm text-gray-600 font-medium">{label}</span>
    </div>
  );
}