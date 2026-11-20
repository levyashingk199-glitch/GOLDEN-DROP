import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import PriceTag from '../components/ui/PriceTag';
import Button from '../components/ui/Button';
import { FiUser, FiPackage, FiTrendingUp, FiLogOut } from 'react-icons/fi';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  const stats = [
    { label: 'Кейсов открыто', value: user?.stats?.casesOpened ?? 142, icon: FiPackage },
    { label: 'Дропов на сумму', value: null, price: user?.stats?.totalDropValue ?? 85200, icon: FiTrendingUp },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto py-4">

      {/* Profile card */}
      <div className="bg-[#1B1E25] border border-[#2D323D] rounded-lg p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-lg bg-[#232731] flex items-center justify-center shrink-0">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <FiUser size={28} className="text-[#8C93A1]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-2xl text-[#E8EAEE] truncate">{user?.username ?? 'Пользователь'}</h1>
          <p className="text-sm text-[#8C93A1] truncate">{user?.email}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-[#8C93A1]">Баланс:</span>
            <PriceTag price={user?.balance ?? 0} size="md" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, value, price, icon: Icon }) => (
          <div
            key={label}
            className="bg-[#1B1E25] border border-[#2D323D] rounded-lg px-5 py-4 flex flex-col gap-1"
          >
            <div className="flex items-center gap-1.5 text-xs text-[#8C93A1]">
              <Icon size={12} />
              {label}
            </div>
            {price != null ? (
              <PriceTag price={price} size="lg" />
            ) : (
              <span className="font-heading text-2xl tabular-nums text-[#E8EAEE]">{value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Best drop */}
      {user?.stats?.bestDrop && (
        <div className="bg-[#1B1E25] border border-[#2D323D] rounded-lg p-5">
          <p className="text-xs text-[#8C93A1] mb-2">Лучший дроп</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#E8EAEE]">{user.stats.bestDrop.name}</p>
            <PriceTag price={user.stats.bestDrop.value} size="md" />
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="pt-2">
        <Button variant="danger" onClick={logout} className="gap-2">
          <FiLogOut size={15} />
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
}
