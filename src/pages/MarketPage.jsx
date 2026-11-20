import React, { useState } from 'react';
import PriceTag from '../components/ui/PriceTag';
import Badge from '../components/ui/Badge';
import WearBar from '../components/ui/WearBar';
import EmptyState from '../components/ui/EmptyState';
import { FiSearch, FiPackage } from 'react-icons/fi';
import marketData from '../mocks/market.json';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { useBalanceStore } from '../store/useBalanceStore';
import { useAuthStore } from '../store/useAuthStore';

const SORT_OPTIONS = [
  { id: 'price-asc', label: 'Дешевле' },
  { id: 'price-desc', label: 'Дороже' },
  { id: 'float-asc', label: 'По float' },
];

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

export default function MarketPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [rarityFilter, setRarityFilter] = useState('');
  const { balance, addBalance } = useBalanceStore();
  const { user, updateBalance } = useAuthStore();

  const currentBalance = user?.balance ?? balance;

  const handleBuy = (listing) => {
    if (currentBalance < listing.price) {
      toast.error(`Недостаточно средств. Пополните баланс на ${listing.price - currentBalance} монет`);
      return;
    }
    const newBal = currentBalance - listing.price;
    updateBalance(newBal);
    toast.success(`Куплен ${listing.skin.name}`);
  };

  let items = [...marketData];

  if (search.trim()) {
    const q = search.toLowerCase();
    items = items.filter((l) => l.skin.name.toLowerCase().includes(q));
  }
  if (rarityFilter) {
    items = items.filter((l) => l.skin.rarity === rarityFilter);
  }

  items.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'float-asc') return a.skin.float - b.skin.float;
    return 0;
  });

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-1 pb-4 border-b border-[#2D323D]">
        <h1 className="font-heading text-3xl text-[#E8EAEE]">Маркет</h1>
        <p className="text-sm text-[#8C93A1]">Торговая площадка скинов CS2</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3">

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C93A1]" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded bg-[#1B1E25] border border-[#2D323D] text-sm text-[#E8EAEE] placeholder-[#8C93A1] outline-none focus:border-[#E8A33D] transition-colors"
          />
        </div>

        {/* Rarity filter */}
        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="px-3 py-2 rounded bg-[#1B1E25] border border-[#2D323D] text-sm text-[#E8EAEE] outline-none focus:border-[#E8A33D] transition-colors"
        >
          {RARITY_FILTERS.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded bg-[#1B1E25] border border-[#2D323D] text-sm text-[#E8EAEE] outline-none focus:border-[#E8A33D] transition-colors"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Listings table */}
      {items.length === 0 ? (
        <EmptyState
          icon={<FiPackage size={48} />}
          title="Ничего не найдено"
          text="Попробуйте изменить параметры поиска или фильтры."
        />
      ) : (
        <div className="bg-[#1B1E25] border border-[#2D323D] rounded-lg overflow-hidden">
          {/* Table head */}
          <div className="hidden md:grid grid-cols-[1fr_120px_120px_90px_120px] gap-4 px-4 py-2.5 border-b border-[#2D323D] text-xs font-medium text-[#8C93A1]">
            <span>Скин</span>
            <span>Редкость</span>
            <span>Float</span>
            <span className="text-right">Цена</span>
            <span />
          </div>

          {items.map((listing, idx) => (
            <div
              key={listing.id}
              className={`flex flex-col md:grid md:grid-cols-[1fr_120px_120px_90px_120px] md:items-center gap-3 md:gap-4 px-4 py-3 ${
                idx < items.length - 1 ? 'border-b border-[#2D323D]' : ''
              }`}
            >
              {/* Skin name + seller */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded bg-[#232731] flex items-center justify-center shrink-0">
                  <FiPackage size={18} className="text-[#2D323D]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[#E8EAEE] font-medium truncate">
                    {listing.skin.statTrak && (
                      <span className="text-[#E8A33D] text-xs mr-1">ST™</span>
                    )}
                    {listing.skin.name}
                  </p>
                  <p className="text-xs text-[#8C93A1] truncate">
                    {listing.skin.conditionFull} · {listing.seller.username}
                  </p>
                </div>
              </div>

              {/* Rarity */}
              <div>
                <Badge rarity={listing.skin.rarity} />
              </div>

              {/* Float + WearBar */}
              <div className="w-28">
                <p className="text-xs text-[#8C93A1] tabular-nums mb-1">
                  {listing.skin.float.toFixed(4)}
                </p>
                <WearBar floatValue={listing.skin.float} />
              </div>

              {/* Price */}
              <div className="text-right">
                <PriceTag price={listing.price} size="md" />
              </div>

              {/* Buy button */}
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleBuy(listing)}
                >
                  Купить
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
