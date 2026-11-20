import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import casesData from '../mocks/cases.json';
import Button from '../components/ui/Button';
import PriceTag from '../components/ui/PriceTag';
import Badge from '../components/ui/Badge';
import RarityStrip from '../components/ui/RarityStrip';
import { getRarity } from '../utils/rarities';
import { useAuthStore } from '../store/useAuthStore';
import { useBalanceStore } from '../store/useBalanceStore';
import { useInventoryStore } from '../store/useInventoryStore';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPackage, FiZap } from 'react-icons/fi';

export default function CaseOpenPage() {
  const { id } = useParams();
  const caseItem = casesData.find((c) => c.id === id) || casesData[0];

  const { user, updateBalance } = useAuthStore();
  const { balance, subtractBalance } = useBalanceStore();
  const { addItem } = useInventoryStore();

  const [isOpening, setIsOpening] = useState(false);
  const [openedItem, setOpenedItem] = useState(null);

  const currentBalance = user?.balance ?? balance;

  const handleOpen = (count = 1) => {
    const cost = caseItem.price * count;
    if (currentBalance < cost) {
      toast.error(`Недостаточно средств. Пополните баланс на ${cost - currentBalance} монет.`);
      return;
    }

    setIsOpening(true);
    setOpenedItem(null);

    // Mock открытие
    setTimeout(() => {
      subtractBalance(cost);
      updateBalance(currentBalance - cost);

      // Случайный скин из содержимого
      const randomIndex = Math.floor(Math.random() * (caseItem.contents?.length || 1));
      const won = caseItem.contents?.[randomIndex] || {
        skinId: 'ak47-vulcan',
        name: 'AK-47 | Vulcan',
        weapon: 'AK-47',
        rarity: 'RESTRICTED',
      };

      const invItem = {
        id: `inv-${Date.now()}`,
        skin: {
          id: won.skinId,
          name: won.name,
          weapon: won.weapon,
          rarity: won.rarity,
        },
        condition: 'MW',
        float: 0.0834,
        price: Math.round(caseItem.price * 1.5),
        obtainedAt: new Date().toISOString(),
        source: caseItem.name,
      };

      addItem(invItem);
      setOpenedItem(invItem);
      setIsOpening(false);
      toast.success(`Вы выиграли: ${won.name}!`);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-2">
      {/* Навигация назад и заголовок */}
      <div className="flex items-center justify-between border-b border-[#2D323D] pb-4">
        <Link
          to="/cases"
          className="inline-flex items-center gap-2 text-xs text-[#8C93A1] hover:text-[#E8EAEE] transition-colors"
        >
          <FiArrowLeft /> Назад к списку кейсов
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8C93A1]">Стоимость открытия:</span>
          <PriceTag price={caseItem.price} size="md" />
        </div>
      </div>

      {/* Верхний блок: Кейс и Рулетка */}
      <div className="flex flex-col items-center gap-6 bg-[#1B1E25] border border-[#2D323D] rounded-[8px] p-6 text-center">
        <h1 className="font-heading text-3xl md:text-4xl text-[#E8EAEE] tracking-wide">
          {caseItem.name}
        </h1>

        {/* Зона рулетки / имитация */}
        <div className="relative w-full h-44 bg-[#13151A] border-y-2 border-[#2D323D] flex items-center justify-center overflow-hidden">
          {/* Центральный указатель */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#E8A33D] z-20 shadow-[0_0_8px_#E8A33D]" />

          {openedItem ? (
            <div className="flex flex-col items-center gap-2 animate-fadeIn z-10">
              <Badge rarity={openedItem.skin.rarity}>
                {openedItem.skin.rarity}
              </Badge>
              <span className="font-heading text-2xl text-[#E8EAEE]">{openedItem.skin.name}</span>
              <PriceTag price={openedItem.price} size="sm" />
            </div>
          ) : isOpening ? (
            <div className="flex items-center gap-3 text-sm text-[#E8A33D] font-medium animate-pulse">
              <FiZap className="animate-spin text-lg" />
              <span>Прокрутка рулетки...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#8C93A1]">
              <FiPackage className="text-4xl opacity-40" />
              <span className="text-xs">Нажмите кнопку ниже для открытия</span>
            </div>
          )}
        </div>

        {/* Кнопки открытия */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            loading={isOpening}
            onClick={() => handleOpen(1)}
            className="min-w-[180px]"
          >
            Открыть за {caseItem.price} монет
          </Button>
          <Button
            variant="secondary"
            size="lg"
            disabled={isOpening}
            onClick={() => handleOpen(3)}
          >
            x3 ({caseItem.price * 3})
          </Button>
          <Button
            variant="secondary"
            size="lg"
            disabled={isOpening}
            onClick={() => handleOpen(5)}
          >
            x5 ({caseItem.price * 5})
          </Button>
        </div>
      </div>

      {/* Содержимое кейса */}
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl text-[#E8EAEE] tracking-wide">
          Содержимое кейса
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {caseItem.contents?.map((skin, idx) => {
            const r = getRarity(skin.rarity);
            return (
              <div
                key={idx}
                className="bg-[#1B1E25] border border-[#2D323D] rounded-[8px] overflow-hidden flex flex-col justify-between"
              >
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <Badge rarity={skin.rarity} />
                  </div>
                  <div className="h-24 bg-[#13151A] rounded-[4px] flex items-center justify-center my-1">
                    <span className="text-[11px] text-[#8C93A1] font-mono">{skin.weapon}</span>
                  </div>
                  <p className="text-xs font-medium text-[#E8EAEE] leading-tight line-clamp-1">
                    {skin.name}
                  </p>
                </div>
                <RarityStrip rarities={skin.rarity} height={3} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
