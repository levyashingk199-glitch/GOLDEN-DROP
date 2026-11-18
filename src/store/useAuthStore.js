import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_AVATAR } from '../utils/constants';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        id: 'usr_default',
        username: 'CS2_Player',
        email: 'player@cs2cases.io',
        avatar: DEFAULT_AVATAR,
        balance: 15450,
      },
      token: 'mock-jwt-token-sample',
      isAuthenticated: true,

      login: (userData, token) => set({ user: userData, token, isAuthenticated: true }),
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      updateBalance: (newBalance) =>
        set((state) => ({
          user: state.user ? { ...state.user, balance: newBalance } : null,
        })),
    }),
    {
      name: 'cs2-auth-store',
    }
  )
);
