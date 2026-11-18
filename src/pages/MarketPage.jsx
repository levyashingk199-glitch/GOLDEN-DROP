import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';

export default function MarketPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-base-300 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FiShoppingBag className="text-accent" /> Маркетплейс CS2
          </h1>
          <p className="text-xs text-base-content/60">Торговая площадка скинов между игроками</p>
        </div>
      </div>
      <div className="p-12 text-center border-2 border-dashed border-base-300 rounded-3xl">
        <p className="text-base-content/50">Витрина маркетплейса и фильтры готовятся к Фазе 5 (TASK-501)</p>
      </div>
    </div>
  );
}
