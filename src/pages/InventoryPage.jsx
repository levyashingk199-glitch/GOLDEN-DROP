import React from 'react';
import { FiBriefcase } from 'react-icons/fi';

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-base-300 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FiBriefcase className="text-secondary" /> Мой Инвентарь
          </h1>
          <p className="text-xs text-base-content/60">Ваши скины, полученные из кейсов или купленные на маркете</p>
        </div>
      </div>
      <div className="p-12 text-center border-2 border-dashed border-base-300 rounded-3xl">
        <p className="text-base-content/50">Сетка инвентаря и WearBar готовятся к Фазе 4 (TASK-401)</p>
      </div>
    </div>
  );
}
