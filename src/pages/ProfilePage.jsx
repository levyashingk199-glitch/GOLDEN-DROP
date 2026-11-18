import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import PriceTag from '../components/ui/PriceTag';

export default function ProfilePage() {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto py-6">
      <div className="p-8 rounded-3xl bg-base-200 border border-base-300 flex items-center gap-6">
        <img
          src={user?.avatar}
          alt={user?.username}
          className="w-20 h-20 rounded-2xl ring-4 ring-primary/30"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
          <p className="text-xs text-base-content/50">{user?.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-base-content/60">Баланс:</span>
            <PriceTag price={user?.balance || 0} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}
