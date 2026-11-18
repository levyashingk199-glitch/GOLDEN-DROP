import { create } from 'zustand';

export const useInventoryStore = create((set) => ({
  items: [],
  totalItems: 0,
  isLoading: false,

  setItems: (items, total) => set({ items, totalItems: total || items.length }),
  addItem: (item) =>
    set((state) => ({
      items: [item, ...state.items],
      totalItems: state.totalItems + 1,
    })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
      totalItems: Math.max(0, state.totalItems - 1),
    })),
}));
