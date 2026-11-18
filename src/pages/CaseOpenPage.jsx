import React from 'react';
import { useParams } from 'react-router-dom';

export default function CaseOpenPage() {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-6 items-center justify-center py-12">
      <h1 className="text-2xl font-bold text-white">Открытие кейса: {id}</h1>
      <p className="text-sm text-base-content/60">Рулетка и логика анимации готовятся к Фазе 3 (TASK-303)</p>
    </div>
  );
}
