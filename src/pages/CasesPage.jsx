import React from 'react';
import { FiBox } from 'react-icons/fi';

export default function CasesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-base-300 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FiBox className="text-primary" /> Каталог кейсов
          </h1>
          <p className="text-xs text-base-content/60">Выбирай кейс и испытывай удачу</p>
        </div>
      </div>
      <div className="p-12 text-center border-2 border-dashed border-base-300 rounded-3xl">
        <p className="text-base-content/50">Каталог кейсов будет наполнен в Фазе 3 (TASK-301)</p>
      </div>
    </div>
  );
}
