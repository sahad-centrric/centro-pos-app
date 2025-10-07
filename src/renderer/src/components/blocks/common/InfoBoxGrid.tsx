import React from 'react';
import type { InfoItem } from '@renderer/types/pos';

interface Props {
  items: InfoItem[];
}

const InfoBoxGrid: React.FC<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((it, idx) => (
        <div
          key={idx}
          className={`text-center p-3 rounded-xl shadow bg-gradient-to-r ${it.bg ?? 'from-gray-50 to-slate-50'}`}
        >
          <div className={`font-medium text-xs ${it.color ?? 'text-gray-600'}`}>{it.label}</div>
          <div className="font-bold text-sm">{it.value}</div>
        </div>
      ))}
    </div>
  );
};

export default InfoBoxGrid;