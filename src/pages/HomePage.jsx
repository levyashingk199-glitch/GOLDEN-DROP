import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import PriceTag from '../components/ui/PriceTag';
import Badge from '../components/ui/Badge';
import { FiPackage, FiShoppingBag, FiUsers } from 'react-icons/fi';
import casesData from '../mocks/cases.json';

// Mock live drops
const LIVE_DROPS = [
  { id: 1, user: 'Player42', skin: 'AWP | Dragon Lore', rarity: 'COVERT', price: 25000, caseId: 'gold-case' },
  { id: 2, user: 'SkinKing', skin: 'Desert Eagle | Printstream', rarity: 'COVERT', price: 6900, caseId: 'fracture-case' },
  { id: 3, user: 'CS_Trader', skin: 'AK-47 | Vulcan', rarity: 'RESTRICTED', price: 1200, caseId: 'revolution-case' },
  { id: 4, user: 'GammaOpener', skin: 'M4A1-S | Cyrex', rarity: 'CLASSIFIED', price: 890, caseId: 'gamma-case' },
  { id: 5, user: 'TopTrader', skin: 'Butterfly Knife | Fade', rarity: 'GOLD', price: 42000, caseId: 'knife-case' },
];

const STATS = [
  { label: 'Кейсов открыто', value: '1 284 310', icon: FiPackage },
  { label: 'Скинов на маркете', value: '84 720', icon: FiShoppingBag },
  { label: 'Онлайн сейчас', value: '3 142', icon: FiUsers },
];

export default function HomePage() {
  const popularCases = casesData.filter((c) => c.isHot).slice(0, 4);

  return (
    <div className="flex flex-col gap-14 py-2">

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8 pt-4">
        <div className="flex flex-col gap-5 max-w-lg">
          <h1 className="font-heading text-5xl md:text-6xl text-[#E8EAEE] leading-tight">
            Кейсы CS2.<br />
            <span className="text-[#E8A33D]">Маркет скинов.</span>
          </h1>
          <p className="text-sm text-[#8C93A1] leading-relaxed max-w-md">
            Открывай кейсы с реальными шансами дропа. Покупай и продавай скины на маркете между игроками.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link to="/cases">
              <Button variant="primary" size="lg">
                <FiPackage size={16} />
                Открыть кейс
              </Button>
            </Link>
            <Link to="/market">
              <Button variant="outline" size="lg">
                <FiShoppingBag size={16} />
                Маркет
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="grid grid-cols-3 gap-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-[#1B1E25] border border-[#2D323D] rounded-lg px-5 py-4 flex flex-col gap-1"
          >
            <span className="font-heading text-2xl md:text-3xl tabular-nums text-[#E8EAEE]">{value}</span>
            <span className="text-xs text-[#8C93A1] flex items-center gap-1.5">
              <Icon size={12} />
              {label}
            </span>
          </div>
        ))}
      </section>

      {/* Популярные кейсы */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl text-[#E8EAEE]">Популярные кейсы</h2>
          <Link
            to="/cases"
            className="text-sm text-[#8C93A1] hover:text-[#E8EAEE] transition-colors"
          >
            Все кейсы →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCases.map((cs) => (
            <Link
              key={cs.id}
              to={`/cases/${cs.id}`}
              className="group bg-[#1B1E25] border border-[#2D323D] rounded-lg overflow-hidden hover:border-[#E8A33D]/40 transition-colors"
            >
              {/* Case image placeholder */}
              <div className="h-36 bg-[#232731] flex items-center justify-center">
                <FiPackage size={40} className="text-[#2D323D]" />
              </div>

              <div className="p-3 flex flex-col gap-2">
                <p className="text-sm font-medium text-[#E8EAEE] leading-tight line-clamp-2">
                  {cs.name}
                </p>
                <div className="flex items-center justify-between">
                  <PriceTag price={cs.price} size="sm" />
                  {cs.isHot && (
                    <span className="text-xs text-[#E8A33D] font-medium">Хит</span>
                  )}
                </div>
              </div>

              {/* Rarity strip */}
              <div className="h-1 flex overflow-hidden">
                {['#B0C3D9', '#5E98D9', '#4B69FF', '#8847FF', '#D32CE6', '#EB4B4B', '#FFD700'].map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Последние дропы */}
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl text-[#E8EAEE]">Последние дропы</h2>

        <div className="bg-[#1B1E25] border border-[#2D323D] rounded-lg overflow-hidden">
          {LIVE_DROPS.map((drop, idx) => (
            <div
              key={drop.id}
              className={`flex items-center justify-between gap-4 px-4 py-3 ${
                idx < LIVE_DROPS.length - 1 ? 'border-b border-[#2D323D]' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded bg-[#232731] flex items-center justify-center shrink-0">
                  <FiPackage size={14} className="text-[#8C93A1]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[#E8EAEE] font-medium truncate">{drop.skin}</p>
                  <p className="text-xs text-[#8C93A1] truncate">{drop.user}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Badge rarity={drop.rarity} />
                <PriceTag price={drop.price} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
