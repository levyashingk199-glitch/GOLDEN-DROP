import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PriceTag from '../components/ui/PriceTag';
import Button from '../components/ui/Button';
import RarityStrip from '../components/ui/RarityStrip';
import { FiPackage } from 'react-icons/fi';
import casesData from '../mocks/cases.json';

const FILTERS = [
  { id: 'all', label: 'Все' },
  { id: 'standard', label: 'Стандарт' },
  { id: 'premium', label: 'Премиум' },
  { id: 'special', label: 'Особые' },
];

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? casesData
      : casesData.filter((c) => c.category === activeFilter);

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-1 pb-4 border-b border-[#2D323D]">
        <h1 className="font-heading text-3xl text-[#E8EAEE]">Каталог кейсов</h1>
        <p className="text-sm text-[#8C93A1]">Выбери кейс и испытай удачу</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeFilter === f.id
                ? 'bg-[#E8A33D] text-[#13151A]'
                : 'bg-[#1B1E25] border border-[#2D323D] text-[#8C93A1] hover:text-[#E8EAEE] hover:border-[#8C93A1]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cases grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((cs) => (
          <div
            key={cs.id}
            className="bg-[#1B1E25] border border-[#2D323D] rounded-lg overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="h-36 bg-[#232731] flex items-center justify-center relative">
              <FiPackage size={48} className="text-[#2D323D]" />
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                {cs.isNew && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#3FB67A]/20 text-[#3FB67A] font-medium">
                    Новинка
                  </span>
                )}
                {cs.isHot && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8A33D]/20 text-[#E8A33D] font-medium">
                    Хит
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-2 flex-1">
              <p className="text-sm font-medium text-[#E8EAEE] leading-tight line-clamp-2">
                {cs.name}
              </p>
              <PriceTag price={cs.price} size="sm" />
              <Link to={`/cases/${cs.id}`} className="mt-auto">
                <Button variant="primary" size="sm" className="w-full">
                  Открыть кейс
                </Button>
              </Link>
            </div>

            {/* Rarity strip */}
            <RarityStrip contents={cs.contents} />
          </div>
        ))}
      </div>
    </div>
  );
}
