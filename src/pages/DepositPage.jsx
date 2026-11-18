import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useBalanceStore } from '../store/useBalanceStore';
import Button from '../components/ui/Button';
import PriceTag from '../components/ui/PriceTag';
import toast from 'react-hot-toast';

export default function DepositPage() {
  const { user, updateBalance } = useAuthStore();
  const { balance, addBalance } = useBalanceStore();

  const handleDeposit = (amount) => {
    addBalance(amount);
    const newBal = (user?.balance || balance) + amount;
    updateBalance(newBal);
    toast.success(`Баланс успешно пополнен на ${amount} 🪙!`);
  };

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-black text-white">Пополнение баланса</h1>
        <p className="text-sm text-base-content/60">Тестовое мгновенное пополнение монет</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[200, 500, 1000, 5000].map((amt) => (
          <button
            key={amt}
            onClick={() => handleDeposit(amt)}
            className="p-4 rounded-2xl bg-base-200 border border-base-300 hover:border-accent hover:scale-105 transition-all text-center flex flex-col items-center gap-1 group"
          >
            <PriceTag price={amt} size="md" />
            <span className="text-[11px] text-base-content/50 group-hover:text-white">Пополнить</span>
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-base-200/50 border border-base-300 flex items-center justify-between">
        <span className="text-sm text-base-content/70">Текущий баланс:</span>
        <PriceTag price={user?.balance ?? balance} size="lg" />
      </div>
    </div>
  );
}
