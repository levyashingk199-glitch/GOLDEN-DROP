# Фаза 1 — Фундамент

## Цель
Настроить проект, конфиги, базовый layout и UI-kit для дальнейшей разработки.

---

## Задачи

### 1.1 Инициализация проекта

```bash
npm create vite@latest . -- --template react
npm install
```

### 1.2 Установка зависимостей

```bash
# Стилизация
npm install tailwindcss @tailwindcss/vite daisyui

# Роутинг
npm install react-router-dom

# HTTP
npm install axios

# Состояние
npm install zustand @tanstack/react-query

# Анимации
npm install framer-motion canvas-confetti

# Утилиты
npm install react-hot-toast react-icons clsx dayjs

# Формы
npm install react-hook-form
```

### 1.3 Конфигурация TailwindCSS

**tailwind.config.js:**
```js
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // CS2 Rarity Colors
        'rarity-consumer': '#B0C3D9',
        'rarity-industrial': '#5E98D9',
        'rarity-milspec': '#4B69FF',
        'rarity-restricted': '#8847FF',
        'rarity-classified': '#D32CE6',
        'rarity-covert': '#EB4B4B',
        'rarity-gold': '#FFD700',
      },
      animation: {
        'roulette-spin': 'roulette-spin 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'roulette-spin': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(var(--roulette-offset))' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        csdark: {
          'primary': '#4B69FF',
          'secondary': '#8847FF',
          'accent': '#FFD700',
          'neutral': '#1a1a2e',
          'base-100': '#0f0f23',
          'base-200': '#1a1a2e',
          'base-300': '#252547',
          'info': '#5E98D9',
          'success': '#36D399',
          'warning': '#FBBD23',
          'error': '#EB4B4B',
        },
      },
    ],
  },
};
```

### 1.4 Axios Instance

**src/api/axios.js:**
```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — обработка 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 1.5 Zustand Store (Auth)

**src/store/useAuthStore.js:**
```js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true });
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      updateBalance: (balance) =>
        set((state) => ({
          user: { ...state.user, balance },
        })),
    }),
    { name: 'auth-storage' }
  )
);
```

### 1.6 Layout компоненты

Создать:
- `Header` — логотип, навигация, баланс, аватар
- `Footer` — ссылки, копирайт
- `Sidebar` — мобильная навигация
- `Layout` — обёртка с Header + Footer + Outlet

### 1.7 Базовые UI компоненты

| Компонент | Описание |
|---|---|
| `Button` | Обёртка над DaisyUI btn с доп. вариантами |
| `Modal` | Модальное окно |
| `Badge` | Бейдж с поддержкой цветов редкости |
| `Card` | Карточка |
| `Loader` | Спиннер загрузки |
| `EmptyState` | Пустое состояние |
| `PriceTag` | Отображение цены с иконкой монеты |

### 1.8 Система редкостей

**src/utils/rarities.js:**
```js
export const RARITIES = {
  CONSUMER: {
    name: 'Consumer Grade',
    nameRu: 'Ширпотреб',
    color: '#B0C3D9',
    bgGradient: 'from-[#B0C3D9]/20 to-transparent',
    borderColor: 'border-[#B0C3D9]',
    glow: 'shadow-[0_0_15px_rgba(176,195,217,0.3)]',
    chance: 79.92,
  },
  INDUSTRIAL: {
    name: 'Industrial Grade',
    nameRu: 'Промышленное',
    color: '#5E98D9',
    bgGradient: 'from-[#5E98D9]/20 to-transparent',
    borderColor: 'border-[#5E98D9]',
    glow: 'shadow-[0_0_15px_rgba(94,152,217,0.3)]',
    chance: 15.98,
  },
  MILSPEC: {
    name: 'Mil-Spec',
    nameRu: 'Армейское',
    color: '#4B69FF',
    bgGradient: 'from-[#4B69FF]/20 to-transparent',
    borderColor: 'border-[#4B69FF]',
    glow: 'shadow-[0_0_20px_rgba(75,105,255,0.4)]',
    chance: 3.2,
  },
  RESTRICTED: {
    name: 'Restricted',
    nameRu: 'Запрещённое',
    color: '#8847FF',
    bgGradient: 'from-[#8847FF]/20 to-transparent',
    borderColor: 'border-[#8847FF]',
    glow: 'shadow-[0_0_25px_rgba(136,71,255,0.5)]',
    chance: 0.64,
  },
  CLASSIFIED: {
    name: 'Classified',
    nameRu: 'Засекреченное',
    color: '#D32CE6',
    bgGradient: 'from-[#D32CE6]/20 to-transparent',
    borderColor: 'border-[#D32CE6]',
    glow: 'shadow-[0_0_30px_rgba(211,44,230,0.5)]',
    chance: 0.128,
  },
  COVERT: {
    name: 'Covert',
    nameRu: 'Тайное',
    color: '#EB4B4B',
    bgGradient: 'from-[#EB4B4B]/20 to-transparent',
    borderColor: 'border-[#EB4B4B]',
    glow: 'shadow-[0_0_35px_rgba(235,75,75,0.6)]',
    chance: 0.026,
  },
  GOLD: {
    name: '★ Exceedingly Rare',
    nameRu: '★ Нож / Перчатки',
    color: '#FFD700',
    bgGradient: 'from-[#FFD700]/20 to-transparent',
    borderColor: 'border-[#FFD700]',
    glow: 'shadow-[0_0_40px_rgba(255,215,0,0.7)]',
    chance: 0.0026,
  },
};
```

### 1.9 Роутинг

**src/Router.jsx:**
```jsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CasesPage from './pages/CasesPage';
import CaseOpenPage from './pages/CaseOpenPage';
import MarketPage from './pages/MarketPage';
import InventoryPage from './pages/InventoryPage';
import ProfilePage from './pages/ProfilePage';
import DepositPage from './pages/DepositPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cases', element: <CasesPage /> },
      { path: 'cases/:id', element: <CaseOpenPage /> },
      { path: 'market', element: <MarketPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'deposit', element: <DepositPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);
```

---

## Критерии завершения

- [x] Проект запускается через `npm run dev`
- [x] TailwindCSS + DaisyUI работают корректно
- [x] Тёмная тема применяется
- [x] Layout отображается на всех страницах
- [x] Роутинг работает
- [x] Axios instance настроен
- [x] Zustand store инициализирован
- [x] Базовые UI компоненты рендерятся
