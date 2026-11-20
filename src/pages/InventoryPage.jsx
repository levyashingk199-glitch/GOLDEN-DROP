import React, { useState } from 'react';
import Badge from '../components/ui/Badge';
import PriceTag from '../components/ui/PriceTag';
import WearBar from '../components/ui/WearBar';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { FiBriefcase, FiShoppingBag } from 'react-icons/fi';
import inventoryData from '../mocks/inventory.json';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

const RARITY_FILTERS = [
  { id: '', label: 'Все' },
  { id: 'CONSUMER', label: 'Ширпотреб' },
  { id: 'INDUSTRIAL', label: 'Промышленное' },
  { id: 'MILSPEC', label: 'Армейское' },
  { id: 'RESTRICTED', label: 'Запрещённое' },
  { id: 'CLASSIFIED', label: 'Засекреченное' },
  { id: 'COVERT', label: 'Тайное' },
  { id: 'GOLD', label: 'Редкое' },
];

const CONDITION_FILTERS = [
  { id: '', label: 'Любое' },
  { id: 'FN', label: 'FN' },
  { id: 'MW', label: 'MW' },
  { id: 'FT', label: 'FT' },
  { id: 'WW', label: 'WW' },
  { id: 'BS', label: 'BS' },
];

export default function InventoryPage() {
  const [rarityFilter, setRarityFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');

  let items = [...inventoryData];
  if (rarityFilter) items = items.filter((i) => i.skin.rarity === rarityFilter);
  if (conditionFilter) items = items.filter((i) => i.condition === conditionFilter);

  const totalValue = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-1 pb-4 border-b border-[#2D323D]">
        <h1 className="font-heading text-3xl text-[#E8EAEE]">Инвентарь</h1>
        <p className="text-sm text-[#8C93A1]">Скины, полученные из кейсов или купленные на маркете</p>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-[#8C93A1]">Предметов</span>
          <span className="font-heading text-xl text-[#E8EAEE] tabular-nums">{items.length}</span>
        </div>
        <div className="w-px bg-[#2D323D]" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-[#8C93A1]">Оценочная стоимость</span>
          <PriceTag price={totalValue} size="lg" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="px-3 py-2 rounded bg-[#1B1E25] border border-[#2D323D] text-sm text-[#E8EAEE] outline-none focus:border-[#E8A33D] transition-colors"
        >
          {RARITY_FILTERS.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>

        <select
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
          className="px-3 py-2 rounded bg-[#1B1E25] border border-[#2D323D] text-sm text-[#E8EAEE] outline-none focus:border-[#E8A33D] transition-colors"
        >
          {CONDITION_FILTERS.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Items grid */}
      {items.length === 0 ? (
        <EmptyState
          icon={<FiBriefcase size={48} />}
          title="Инвентарь пуст"
          text="Открывайте кейсы, чтобы получить скины."
          action={{ label: 'Перейти к кейсам', onClick: () => {} }}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#1B1E25] border border-[#2D323D] rounded-lg overflow-hidden flex flex-col"
              style={{ borderBottomColor: item.skin.rarity === 'GOLD' ? '#FFD700' : undefined }}
            >
              {/* Image */}
              <div className="h-28 bg-[#232731] flex items-center justify-center relative">
                <FiBriefcase size={36} className="text-[#2D323D]" />
                {item.skin.statTrak && (
                  <span className="absolute top-2 left-2 text-[9px] px-1 py-0.5 bg-[#E8A33D]/20 text-[#E8A33D] rounded font-medium">
                    ST™
                  </span>
                )}
                {item.isListed && (
                  <span className="absolute top-2 right-2 text-[9px] px-1 py-0.5 bg-[#3FB67A]/20 text-[#3FB67A] rounded font-medium">
                    На продаже
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col gap-2 flex-1">
                <div>
                  <p className="text-xs font-medium text-[#E8EAEE] leading-tight line-clamp-2">
                    {item.skin.name}
                  </p>
                  <Badge rarity={item.skin.rarity} className="mt-1" />
                </div>

                <div className="mt-auto flex flex-col gap-1.5">
                  <WearBar floatValue={item.float} />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#8C93A1]">{item.conditionFull}</span>
                    <PriceTag price={item.price} size="xs" />
                  </div>
                </div>

                {!item.isListed && (
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <FiShoppingBag size={12} />
                    Выставить
                  </Button>
                )}
              </div>

              {/* Rarity bottom line */}
              <div
                className="h-0.5"
                style={{
                  backgroundColor:
                    {
                      CONSUMER: '#B0C3D9',
                      INDUSTRIAL: '#5E98D9',
                      MILSPEC: '#4B69FF',
                      RESTRICTED: '#8847FF',
                      CLASSIFIED: '#D32CE6',
                      COVERT: '#EB4B4B',
                      GOLD: '#FFD700',
                    }[item.skin.rarity] || '#2D323D',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
