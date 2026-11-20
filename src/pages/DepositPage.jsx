import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useBalanceStore } from '../store/useBalanceStore';
import Button from '../components/ui/Button';
import PriceTag from '../components/ui/PriceTag';
import toast from 'react-hot-toast';
import { FiCreditCard, FiSmartphone, FiDollarSign } from 'react-icons/fi';

const PRESET_AMOUNTS = [100, 500, 1000, 5000];
const PAYMENT_METHODS = [
  { id: 'card', name: 'Банковская карта', icon: FiCreditCard },
  { id: 'sbp', name: 'СБП', icon: FiSmartphone },
  { id: 'crypto', name: 'Криптовалюта', icon: FiDollarSign },
];

export default function DepositPage() {
  const { user, updateBalance } = useAuthStore();
  const { balance, addBalance } = useBalanceStore();

  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const amountToDeposit = customAmount ? Number(customAmount) : selectedAmount;
  const currentBalance = user?.balance ?? balance;

  const handlePresetClick = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
  };

  const handleDeposit = () => {
    if (!amountToDeposit || amountToDeposit <= 0) {
      toast.error('Введите корректную сумму пополнения');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      addBalance(amountToDeposit);
      const newBal = currentBalance + amountToDeposit;
      updateBalance(newBal);
      setIsProcessing(false);
      toast.success(`Баланс пополнен на ${amountToDeposit} монет`);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto py-4">
      <div>
        <h1 className="font-heading text-3xl text-[#E8EAEE] tracking-wide">
          Пополнение баланса
        </h1>
        <p className="text-xs text-[#8C93A1] mt-1">
          Выберите фиксированную сумму или укажите собственную
        </p>
      </div>

      {/* Быстрый выбор суммы */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#8C93A1] uppercase tracking-wider">
          Быстрый выбор
        </label>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map((amt) => {
            const isSelected = !customAmount && selectedAmount === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => handlePresetClick(amt)}
                className={`h-12 rounded-[4px] border flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#E8A33D] bg-[#232731] text-[#E8EAEE]'
                    : 'border-[#2D323D] bg-[#1B1E25] text-[#8C93A1] hover:border-[#8C93A1] hover:text-[#E8EAEE]'
                }`}
              >
                <PriceTag price={amt} size="sm" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Произвольная сумма */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#8C93A1] uppercase tracking-wider">
          Произвольная сумма
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Введите количество монет..."
            value={customAmount}
            onChange={handleCustomChange}
            className="w-full h-11 px-3 bg-[#1B1E25] border border-[#2D323D] rounded-[4px] text-sm text-[#E8EAEE] placeholder-[#8C93A1]/50 focus:outline-none focus:border-[#E8A33D] tabular-nums"
          />
        </div>
      </div>

      {/* Способ оплаты */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#8C93A1] uppercase tracking-wider">
          Способ оплаты
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const isSelected = paymentMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`p-3 rounded-[4px] border flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#E8A33D] bg-[#232731] text-[#E8EAEE]'
                    : 'border-[#2D323D] bg-[#1B1E25] text-[#8C93A1] hover:border-[#8C93A1] hover:text-[#E8EAEE]'
                }`}
              >
                <Icon className="text-lg" />
                <span className="text-xs font-medium">{method.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Текущий баланс и кнопка действия */}
      <div className="p-4 bg-[#1B1E25] border border-[#2D323D] rounded-[8px] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] text-[#8C93A1] uppercase tracking-wider">
            Текущий баланс
          </span>
          <PriceTag price={currentBalance} size="md" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[11px] text-[#8C93A1] uppercase tracking-wider">
            К зачислению
          </span>
          <span className="text-sm font-semibold text-[#3FB67A] tabular-nums">
            +{amountToDeposit || 0} монет
          </span>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        loading={isProcessing}
        onClick={handleDeposit}
        disabled={!amountToDeposit || amountToDeposit <= 0}
        className="w-full"
      >
        Пополнить баланс на {amountToDeposit || 0} монет
      </Button>
    </div>
  );
}
