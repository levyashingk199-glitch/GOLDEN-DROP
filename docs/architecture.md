# Архитектура и конвенции

## Гайд для агентов-разработчиков

Этот документ описывает архитектурные решения, паттерны кода и конвенции именования для единообразной разработки.

---

## Структура компонентов

### Правило именования файлов
- Компоненты: **PascalCase** (`CaseCard.jsx`, `MarketFilters.jsx`)
- Хуки: **camelCase** с префиксом `use` (`useAuth.js`, `useCaseOpen.js`)
- Утилиты: **camelCase** (`formatPrice.js`, `rarities.js`)
- API модули: **camelCase** с суффиксом `.api` (`cases.api.js`)
- Сторы: **camelCase** с префиксом `use` и суффиксом `Store` (`useAuthStore.js`)

### Структура компонента

```jsx
// 1. Импорты (группировка: react → библиотеки → компоненты → утилиты → стили)
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/formatPrice';

// 2. Константы (если специфичны для компонента)
const ANIMATION_DURATION = 300;

// 3. Компонент
export default function CaseCard({ caseData, onOpen }) {
  // 3.1 Хуки (состояние, эффекты)
  const [isHovered, setIsHovered] = useState(false);
  
  // 3.2 Обработчики
  const handleOpen = () => {
    onOpen(caseData.id);
  };
  
  // 3.3 Рендер
  return (
    <div className="card bg-base-200 hover:shadow-xl transition-all">
      {/* ... */}
    </div>
  );
}
```

---

## Паттерны состояния

### Zustand Store
```js
// Каждый стор — один файл в src/store/
// Используем persist middleware для критичных данных (auth)
// Не используем persist для часто меняющихся данных (инвентарь)

import { create } from 'zustand';

const useExampleStore = create((set, get) => ({
  // Данные
  items: [],
  isLoading: false,
  error: null,
  
  // Действия
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  
  // Асинхронные действия
  fetchItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/items');
      set({ items: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
```

### React Query (для серверных данных)
```jsx
// Используем React Query для:
// - Кэширование API ответов
// - Автоматическую ревалидацию
// - Пагинацию
// - Оптимистичные обновления

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Чтение
const { data, isLoading } = useQuery({
  queryKey: ['cases'],
  queryFn: () => casesApi.getAll(),
});

// Мутация с инвалидацией
const queryClient = useQueryClient();
const { mutate: openCase } = useMutation({
  mutationFn: (caseId) => casesApi.open(caseId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['inventory'] });
    queryClient.invalidateQueries({ queryKey: ['balance'] });
  },
});
```

---

## API слой

### Axios Instance
```
src/api/
├── axios.js         # Настроенный instance
├── auth.api.js      # POST /auth/login, /auth/register, GET /auth/me
├── cases.api.js     # GET /cases, GET /cases/:id, POST /cases/:id/open
├── market.api.js    # GET /market, POST /market/buy/:id, POST /market/sell
├── inventory.api.js # GET /inventory
└── user.api.js      # GET /user/profile, POST /user/deposit
```

### Формат API-ответов (ожидаемый от бэкенда)
```js
// Успешный ответ
{
  "success": true,
  "data": { ... },
  "message": "OK"
}

// Список с пагинацией
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 147,
    "totalPages": 8
  }
}

// Ошибка
{
  "success": false,
  "message": "Недостаточно средств",
  "code": "INSUFFICIENT_BALANCE"
}
```

---

## Стилизация

### TailwindCSS конвенции
- Используем utility-first подход
- DaisyUI компоненты как базу (btn, card, modal, badge, input...)
- Кастомные цвета через `theme.extend.colors` (rarity-*)
- Тёмная тема: `data-theme="csdark"` на `<html>`
- Анимации: Tailwind keyframes + Framer Motion для сложных

### CSS классы для редкостей
```
Граница:   border-rarity-{name}    → border-rarity-covert
Фон:       bg-rarity-{name}/20     → bg-rarity-restricted/20
Текст:     text-rarity-{name}      → text-rarity-gold
Свечение:  shadow-rarity-{name}    → (через конфиг)
```

### Отступы и размеры
- Секции: `py-8 md:py-12`
- Карточки: `p-4`
- Сетки: `gap-4 md:gap-6`
- Контейнер: `max-w-7xl mx-auto px-4`

---

## Роутинг

### Схема маршрутов
```
/                    → HomePage        (публичная)
/cases               → CasesPage       (публичная)
/cases/:id           → CaseOpenPage    (AuthGuard)
/market              → MarketPage      (публичная)
/market/:id          → MarketItemPage  (публичная)
/inventory           → InventoryPage   (AuthGuard)
/profile             → ProfilePage     (AuthGuard)
/deposit             → DepositPage     (AuthGuard)
/login               → LoginPage       (редирект если залогинен)
/register            → RegisterPage    (редирект если залогинен)
*                    → NotFoundPage
```

---

## Моковые данные

При отсутствии бэкенда используем JSON-файлы в `src/mocks/`:
- Импортируем напрямую в компоненты/хуки
- В будущем заменяются реальными API-вызовами
- Формат мок-данных соответствует ожидаемому API

---

## Ключевые зависимости между компонентами

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   ├── BalanceDisplay ← useBalanceStore
│   │   └── UserMenu ← useAuthStore
│   ├── Outlet (страницы)
│   └── Footer
│
├── CasesPage
│   └── CaseCard[] → CaseOpenPage
│
├── CaseOpenPage
│   ├── CaseContents
│   ├── CaseRoulette ← useCaseOpen hook
│   │   └── RouletteItem[]
│   └── CaseOpenResult
│       └── SkinDetails
│
├── MarketPage
│   ├── MarketFilters
│   ├── MarketGrid
│   │   └── MarketSkinCard[]
│   └── SellModal
│
├── InventoryPage
│   ├── InventoryFilters
│   ├── InventoryGrid
│   │   └── InventoryItem[]
│   └── SkinDetails (модалка)
│
└── ProfilePage
    ├── UserInfo
    ├── UserStats
    └── TransactionHistory
```

---

## Порядок разработки (для агентов)

1. **Всегда начинай с Phase 1** — без фундамента ничего не работает
2. **Phase 2 (Auth)** — до любой логики с балансом и инвентарём
3. **Phase 3 (Cases)** — ключевая фича, наибольший приоритет
4. **Phase 4 (Inventory)** — зависит от Phase 3 (куда падают дропы)
5. **Phase 5 (Market)** — зависит от Phase 4 (откуда продавать)
6. **Phase 6 (Wallet)** — может параллелиться с Phase 4-5
7. **Phase 7 (Polish)** — после завершения основных фич
