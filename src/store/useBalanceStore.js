import { create } from 'zustand';

export const useBalanceStore = create((set) => ({
  balance: 15450,
  isLoading: false,

  setBalance: (balance) => set({ balance }),
  addBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
  subtractBalance: (amount) =>
    set((state) => ({ balance: Math.max(0, state.balance - amount) })),
}));
